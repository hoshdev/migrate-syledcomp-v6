module.exports = function (fileInfo, api) {
  const j = api.jscodeshift;

  // Buscar cualquier instancia de styled.<cualquier cosa>
  return j(fileInfo.source)
    .find(j.MemberExpression, {
      object: {
        name: "styled",
      },
    })
    .forEach((path) => {
      path.node.property.name =
        path.node.property.name +
        `.withConfig({
          shouldForwardProp: (prop) =>
          !TAGS.includes(prop),
      })`;
    })
    .toSource();
};
