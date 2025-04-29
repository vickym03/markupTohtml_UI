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
  padding: 20px;

  .groupBtn {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }

  .heading {
    font-size: 22px;
    padding: 0px 20px;
  }

  .statsTable {
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: center;
  }

  .btn {
    padding: 20px;
    outline: none;
    border-radius: 10px;
    border: 1px solid #318ce7;
    width: 170px;
    font-size: 16px;
    text-align: center;
    display: inline-block;
    background-color: white;
    color: #00008b;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
  }

  .btn:hover {
    background-color: #318ce7;
    color: white;
  }

  .btn-borrowers {
    border-color: #4caf50;
    color: #4caf50;
  }

  .btn-borrowers:hover {
    background-color: #4caf50;
  }

  .btn-lented {
    border-color: #ff9800;
    color: #ff9800;
  }

  .btn-lented:hover {
    background-color: #ff9800;
  }

  .btn-collected {
    border-color: #f44336;
    color: #f44336;
  }

  .btn-collected:hover {
    background-color: #f44336;
  }

  .btn-closed {
    border-color: #9c27b0;
    color: #9c27b0;
  }

  .btn-closed:hover {
    background-color: #9c27b0;
  }

  .btn-paid {
    border-color: #03a9f4;
    color: #03a9f4;
  }

  .btn-paid:hover {
    background-color: #03a9f4;
  }

  .btn-unpaid {
    border-color: #ff5722;
    color: #ff5722;
  }

  .btn-unpaid:hover {
    background-color: #ff5722;
  }

  @media (max-width: 768px) {
    .btn {
      width: 120px;
      font-size: 14px;
      padding: 15px;
    }
  }

  @media (max-width: 480px) {
    .btn {
      width: 100px;
      font-size: 12px;
      padding: 10px;
    }
  }
`;
