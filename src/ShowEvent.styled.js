import styled from "styled-components";

export const StyledEvent = styled.span`
  background: ${({ bgColor }) => bgColor};
  color: black;
  text-align: left !important;
  padding: 2px 10px;
  border-radius: 10px;
  font-size: 13px;
  cursor: move;
  text-transform: capitalize;
  display: flex;
  height: ${({ height }) => height};
  top: ${({ top }) => top};
  align-items: center;
  z-index: 1;
  flex-grow: 1;
  position:relative;
  margin: 2px;
`;
