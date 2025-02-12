module.exports = function (fileInfo, api) {
  const j = api.jscodeshift;

  // Busca todas las declaraciones de `styled.button` y las reemplaza por `styled.div`
  return j(fileInfo.source)
    .find(j.CallExpression, {
      callee: {
        object: {
          name: "styled",
        },
        property: {
          name: "button",
        },
      },
    })
    .forEach((path) => {
      // Cambiar 'button' por 'div'
      path.node.callee.property.name = "div";
    })
    .toSource();
};
