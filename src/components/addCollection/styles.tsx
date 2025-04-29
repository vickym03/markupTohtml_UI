import styled from "styled-components";

export const Container = styled.div`
  display: flex;

  flex-direction: column;
  gap: 10px;
  margin: 10px;
height: 96vh;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;

  .groupBtn {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 20px;
  }

  .heading {
    font-size: 22px;
    padding: 0px 20px;
  }

  .btn {
    padding: 20px;
    outline: none;
    border-radius: 10px;
    border: 1px solid #318ce7;
    width: 150px;
    font-size: 16px;
    text-align: center;
    display: inline-block;
    background-color: white;
    color: #00008b;
    cursor: pointer;

    &:hover {
      background-color: #318ce7;
      color: white;
    }
  }
`;
