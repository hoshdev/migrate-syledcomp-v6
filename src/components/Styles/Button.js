import React from "react";
import styled from "styled-components";
import { TAGS } from "./const";

const Button = styled.button.withConfig({
  shouldForwardProp: (prop) => !TAGS.includes(prop),
})`
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

export const ButtonWithAttrs = styled.button
  .withConfig({
    shouldForwardProp: (prop) => !TAGS.includes(prop),
  })
  .attrs((props) => ({
    bgColor: props.bgColor || "green",
    textColor: props.textColor || "white",
    hoverColor: props.hoverColor || "#2980b9",
  }))`
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.textColor};
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: ${(props) => props.hoverColor};
  }
`;

export default Button;
