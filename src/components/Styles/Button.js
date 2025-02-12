import React from "react";
import styled from "styled-components";

const Button = styled.div`
  background-color: ${(props) => props.bgColor || "#3498db"};
  color: ${(props) => props.textColor || "white"};
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: ${(props) => props.hoverColor || "#2980b9"};
  }
`;

export default Button;
