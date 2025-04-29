import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 10px;

  .subContainer {
    padding: 5px 0px;
    border-radius: 10px;
    box-shadow: #ccccff 0px 1px 4px;
  }

  .header {
    font-size: 22px;
    text-align: center;
  }
`;

export const StyledButton = styled.button<{ isActive: boolean }>`
  background-color: ${(props) => (props.isActive ? "#940B92" : "#F1F0E8")};
  color: ${(props) => (props.isActive ? "#F1F0E8" : "#2A3335")};
  margin: 5px;
  padding: 10px;
  border: none;
  cursor: pointer;
  border-radius: 15px;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: ${(props) =>
      props.isActive
        ? "#F1F0E8"
        : "#E6E6E6"}; /* Adjusted hover color for unselected */
    color: ${(props) =>
      props.isActive
        ? "#940B92"
        : "#333333"}; /* Slightly darker text on hover */
  }
`;
