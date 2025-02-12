import React from "react";
import Button from "./components/Styles/Button";

const App = () => {
  return (
    <h1>
      ¡Hola, React!
      <br />
      <Button textColor="black" onClick={() => alert("click")}>
        Click Here{" "}
      </Button>
    </h1>
  );
};

export default App;
