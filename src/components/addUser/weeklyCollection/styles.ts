import styled from "styled-components";

// Container for the form
export const Container = styled.div`
  margin: 20px auto;
  padding: 20px 30px;
  max-width: 93%;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;

  .form-row {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 16px;
    gap: 10px;
  }
  .form-field {
    flex: 1 1 20%; /* Set to 30% to fit three items in a row */
    margin-right: 20px;

    &:nth-child(3n) {
      margin-right: 0; /* Remove margin-right for every third item */
    }
  }

  // Mobile view: stack fields in a single column
  @media (max-width: 768px) {
    .form-field {
      flex: 1 1 100%; // 1 item per row on mobile
      margin-right: 0;
    }
  }

  .error {
    color: #e31837;
    font-size: 12px;
    padding: 5px 0px;
  }

  .profile-pic-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }

  .profileContainer {
    display: flex;
    justify-content: center; /* Center horizontally */
    align-items: center; /* Center vertically */
    flex-direction: column; /* Arrange child elements in a column */
    margin: 10 auto; /* Center the container horizontally */
  }

  .profile-pic {
    width: 90px; /* Adjust the size of the circle */
    height: 90px; /* Adjust the size of the circle */
    object-fit: cover;
    border-radius: 50%;
    border: 1px solid #ccc; /* Optional: adds a border around the circle */
  }

  .profileCircle {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    border: 1px solid gray;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  Select,
  Input {
    padding: 5px;
  }

  Input.ant-input {
    background: white !important;
  }

  .heading {
    font-size: 25px;
  }

  .sub-heading {
    font-size: 14px;
    padding: 10px 0px;
  }
  .groupBtn {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    width: 100%;
  }

  .Btn {
    position: relative;
    overflow: hidden;

    &:not([disabled]):not(.ant-btn-dangerous) {
      > span {
        position: relative;
      }

      &::before {
        content: "";
        position: absolute;
        inset: -1px;
        z-index: 0;
        transition: all 0.3s;
        border-radius: inherit;
      }

      &:hover::before {
        opacity: 0;
      }

      & > span {
        position: relative;
        z-index: 1;
      }
    }
  }

  .ant-btn {
    font-size: 15px;
    width: 100px;
  }
`;
