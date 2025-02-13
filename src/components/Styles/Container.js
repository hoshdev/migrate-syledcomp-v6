import styled from "styled-components";
import { TAGS } from "./const";

const Container = styled.div`
  margin: 0 auto;
  padding: ${(props) => props.padding || "16px"};
  display: ${(props) => props.display || "flex"};
  flex-direction: ${(props) => props.direction || "row"};
  justify-content: ${(props) => props.justify || "center"};
  align-items: ${(props) => props.align || "center"};
  background-color: ${(props) => props.bgColor || "transparent"};
  border-radius: ${(props) => props.borderRadius || "8px"};
`;

export const ContainerWithCustomBorder = styled(Container)`
  border: ${(props) => props.customBorder || "1px solid grey"};
  background-color: white;
`;

export default Container;
