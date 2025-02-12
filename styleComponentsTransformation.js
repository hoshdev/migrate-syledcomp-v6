// my-transformation.js

module.exports = function (fileInfo, api) {
  const j = api.jscodeshift; // jscodeshift API
  const root = j(fileInfo.source); // Obtener el AST del código fuente

  // Definir una variable predefinida con las propiedades a excluir
  const excludedProps = ["bgColor", "textColor", "hoverColor"];

  // Buscar todos los componentes estilizados creados con `styled`
  root
    .find(j.CallExpression, {
      callee: {
        object: { name: "styled" },
      },
    })
    .forEach((path) => {
      // Obtener el template literal dentro de styled
      const templateLiteral = path.node.arguments[0];

      // Verificar si el template literal tiene interpolaciones con propiedades a excluir
      let hasExcludedProps = false;

      // Si el templateLiteral es un TemplateLiteral, recorrer las expresiones
      if (templateLiteral && templateLiteral.type === "TemplateLiteral") {
        templateLiteral.expressions.forEach((expression) => {
          // Verificar si alguna de las expresiones tiene una propiedad excluida
          if (
            expression.type === "MemberExpression" &&
            expression.object.type === "Identifier" &&
            excludedProps.includes(expression.property.name)
          ) {
            hasExcludedProps = true;
          }
        });
      }

      // Si se encuentra alguna propiedad a excluir, agregar withConfig
      if (hasExcludedProps) {
        const withConfigCall = j.callExpression(
          j.memberExpression(path.node, j.identifier("withConfig")),
          [
            j.objectExpression([
              j.property(
                "init",
                j.identifier("displayName"),
                j.literal("MyStyledComponent")
              ),
              j.property(
                "init",
                j.identifier("shouldForwardProp"),
                j.arrowFunctionExpression(
                  [j.identifier("prop")],
                  j.unaryExpression(
                    "!",
                    j
                      .memberExpression(
                        j.arrayExpression(
                          excludedProps.map((prop) => j.literal(prop))
                        ),
                        j.identifier("includes")
                      )
                      .callExpression([j.identifier("prop")])
                  )
                )
              ),
            ]),
          ]
        );

        // Agregar `withConfig` al componente
        path.node.arguments[0] = j.callExpression(
          j.memberExpression(path.node, j.identifier("withConfig")),
          [
            j.objectExpression([
              j.property(
                "init",
                j.identifier("shouldForwardProp"),
                j.arrowFunctionExpression(
                  [j.identifier("prop")],
                  j.unaryExpression(
                    "!",
                    j
                      .memberExpression(
                        j.arrayExpression(
                          excludedProps.map((prop) => j.literal(prop))
                        ),
                        j.identifier("includes")
                      )
                      .callExpression([j.identifier("prop")])
                  )
                )
              ),
            ]),
          ]
        );
      }
    });

  return root.toSource(); // Convertir el AST de vuelta a código fuente
};
