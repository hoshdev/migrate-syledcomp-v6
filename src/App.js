import React from "react";
import Button, { ButtonWithAttrs } from "./components/Styles/Button";
import Container, {
  ContainerWithCustomBorder,
  ContainerWithCustomBorderWitAttrs,
} from "./components/Styles/Container";

const App = () => {
  return (
    <Container align="right" bgColor="grey" borderRadius="5px">
      ¡Hola, React!
      <br />
      <Button textColor="black" onClick={() => alert("click")}>
        Button
      </Button>
      <ButtonWithAttrs textColor="black" onClick={() => alert("click")}>
        Button with Attrs
      </ButtonWithAttrs>
      <ContainerWithCustomBorder customBorder="2px solid red">
        Container with custom border
      </ContainerWithCustomBorder>
      <ContainerWithCustomBorderWitAttrs customBorder="2px solid red">
        Container with custom border
      </ContainerWithCustomBorderWitAttrs>
    </Container>
  );
};

export default App;
