module.exports = function (fileInfo, api) {
  const j = api.jscodeshift; // jscodeshift API
  const root = j(fileInfo.source); // Obtener el AST del código fuente

  // Buscar todas las llamadas a `console.log` y cambiarlas a `console.error`
  root
    .find(j.CallExpression, {
      callee: {
        object: { name: "console" },
        property: { name: "log" },
      },
    })
    .forEach((path) => {
      path.node.callee.property.name = "error"; // Cambiar `log` a `error`
    });

  return root.toSource(); // Convertir el AST de vuelta a código fuente
};
