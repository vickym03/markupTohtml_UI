import styled from "styled-components";

export const Container = styled.div`
  .header {
    display: flex;
    font-weight: bold;
    padding: 10px 0px;
    box-shadow: #fffdf0 3px 3px 6px 0px inset, #eff3ea -3px -3px 6px 1px inset;
    font-size: 14px;
  }
  .header span {
    flex: 1;
    text-align: center;
  }
  .row {
    display: flex;
    // width: 100%;
    align-items: center;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px,
      rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
    margin: 10px 0px;
    padding: 5px 5px;
    font-size: 14px;
  }

  .row span,
  .row button {
    flex: 1;
    text-align: center;
  }

  button {
    flex: 0;
  }

  .profile {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    border: 1px solid gray;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
`;
