import styled from "styled-components";

const Container = styled.div`
  background-color: white;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  padding: 10px;
  margin: 5px;
  height: 95vh;

  .MarkdownInput,
  .RenderOutput {
    width: 50%;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
    padding: 10px;
    overflow: auto;
  }

  textarea {
    width: 98%;
    height: 95%;
    font-family: "Courier New", Courier, monospace;
    font-size: 15px;
    padding: 10px 10px;
    border: none;
    outline: none;
    border-radius: 5px;
    resize: none;
  }

  .label {
    color: gray;
  }
  .error {
    color: red;
  }
`;

export default Container;
