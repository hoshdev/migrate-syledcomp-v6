module.exports = function (fileInfo, api) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  // Función para generar .withConfig(...)
  const createWithConfig = (node) =>
    j.callExpression(
      j.memberExpression(node, j.identifier("withConfig")), // node.withConfig
      [
        j.objectExpression([
          j.objectProperty(
            j.identifier("shouldForwardProp"),
            j.arrowFunctionExpression(
              [j.identifier("prop")], // (prop) =>
              j.unaryExpression(
                // !TAGS_SET.has(prop)
                "!",
                j.callExpression(
                  j.memberExpression(
                    j.identifier("TAGS_SET"),
                    j.identifier("has")
                  ),
                  [j.identifier("prop")]
                )
              )
            )
          ),
        ]),
      ]
    );

  // Modificar styled(Nombre) agregando .withConfig(...)
  root
    .find(j.CallExpression, { callee: { name: "styled" } }) // styled(Nombre)
    .forEach((path) => {
      const hasWithConfig =
        path.parentPath.value &&
        j.MemberExpression.check(path.parentPath.value) &&
        path.parentPath.value.property.name === "withConfig";

      if (!hasWithConfig) {
        path.replace(createWithConfig(path.node));
      }
    });

  // Modificar styled.div, styled.button, etc.
  root
    .find(j.MemberExpression, { object: { name: "styled" } }) // styled.Algo
    .forEach((path) => {
      if (
        !(
          j.MemberExpression.check(path.node) &&
          j.Identifier.check(path.node.property) &&
          path.node.property.name.includes("withConfig")
        )
      ) {
        path.replace(createWithConfig(path.node));
      }
    });

  return root.toSource();
};
