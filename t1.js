module.exports = function (fileInfo, api) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  // Modificar styled(Nombre) agregando .withConfig(...)
  root
    .find(j.CallExpression, {
      callee: { name: "styled" }, // styled(Nombre)
    })
    .forEach((path) => {
      const hasWithConfig =
        path.parentPath.value &&
        j.MemberExpression.check(path.parentPath.value) &&
        path.parentPath.value.property.name === "withConfig";

      if (!hasWithConfig) {
        path.replace(
          j.callExpression(
            j.memberExpression(path.node, j.identifier("withConfig")),
            [
              j.objectExpression([
                j.objectProperty(
                  j.identifier("shouldForwardProp"),
                  j.arrowFunctionExpression(
                    [j.identifier("prop")],
                    j.unaryExpression(
                      "!",
                      j.callExpression(
                        j.memberExpression(
                          j.identifier("TAGS"),
                          j.identifier("includes")
                        ),
                        [j.identifier("prop")]
                      )
                    )
                  )
                ),
              ]),
            ]
          )
        );
      }
    });

  // Modificar styled.div, styled.button, etc.
  root
    .find(j.MemberExpression, {
      object: { name: "styled" }, // styled.Algo
    })
    .forEach((path) => {
      if (!path.node.property.name.includes("withConfig")) {
        path.node.property.name =
          path.node.property.name +
          `.withConfig({
              shouldForwardProp: (prop) =>
              !TAGS.includes(prop),
          })`;
      }
    });

  return root.toSource();
};
