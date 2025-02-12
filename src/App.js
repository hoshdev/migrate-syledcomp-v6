import React from "react";
import Button from "./components/Styles/Button";
import Container from "./components/Styles/Container";

const App = () => {
  return (
    <Container align="right" bgColor="grey" borderRadius="5px">
      ¡Hola, React!
      <br />
      <Button textColor="black" onClick={() => alert("click")}>
        Click Here{" "}
      </Button>
    </Container>
  );
};

export default App;
