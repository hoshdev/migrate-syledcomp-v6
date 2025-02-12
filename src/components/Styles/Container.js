import styled from "styled-components";
import { TAGS } from "./const";

const Container = styled.div.withConfig({
  shouldForwardProp: (prop) => !TAGS.includes(prop),
})`
  margin: 0 auto;
  border: 1px solid grey;
  padding: ${(props) => props.padding || "16px"};
  display: ${(props) => props.display || "flex"};
  flex-direction: ${(props) => props.direction || "row"};
  justify-content: ${(props) => props.justify || "center"};
  align-items: ${(props) => props.align || "center"};
  background-color: ${(props) => props.bg || "transparent"};
  border-radius: ${(props) => props.radius || "8px"};
  box-shadow: ${(props) =>
    props.shadow ? "0px 4px 6px rgba(0, 0, 0, 0.1)" : "none"};
`;

export default Container;
