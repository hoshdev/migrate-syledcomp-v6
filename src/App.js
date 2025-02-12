import React from "react";
import Button from "./components/Styles/Button";
import Container, {
  ContainerWithCustomBorder,
} from "./components/Styles/Container";

const App = () => {
  return (
    <Container align="right" bgColor="grey" borderRadius="5px">
      ¡Hola, React!
      <br />
      <Button textColor="black" onClick={() => alert("click")}>
        Click Here{" "}
      </Button>
      <ContainerWithCustomBorder customBorder="2px solid red">
        Container with custom border
      </ContainerWithCustomBorder>
    </Container>
  );
};

export default App;
