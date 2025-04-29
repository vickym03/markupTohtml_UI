import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 10px;
  height: 90vh;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  padding: 20px;

  .heading {
    display: flex;
    justify-content: space-between;
    align-items: center;

    p {
      margin: 0;
      font-size: 18px;
      font-weight: 500;
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 100%;

    Input {
      width: 30%;
    }

    .ant-radio-group {
      display: flex;
      align-items: center;
      // width: 50%;
    }
  }

  Button {
    width: 20%;
    align-items: center;
  }

  .inputField {
    display: flex;
    gap: 20px;
  }

  .radiobtn {
    width: 100%;
  }


    .error {
    color: #e31837;
    font-size: 12px;
    padding: 5px 0px;
  }
  .ant-radio-wrapper {
    display: flex;
    justify-content: left;
  }

  /* Media query for mobile view */
  @media (max-width: 768px) {
    .content {
      Input {
        width: 100%;
       
      }

      .ant-radio-group {
        display: flex;
        // align-items: center;
        gap: 10px;
        // width: 100%;
        //flex-direction: column; /* Adjusts layout for better readability */
      }
    }
  }
`;
