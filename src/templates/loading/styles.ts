import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999; /* Ensure it's on top */
  transition: 2s background;
  background: rgba(54, 54, 54, 0.5);

  .spin {
    font-size: 48px;
  }
`;
