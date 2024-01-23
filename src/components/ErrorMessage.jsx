import styled from "styled-components";

export const ErrorMessage = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  background-color: red;
  margin: 120px 200px 0 200px;
  border-radius: 50px;
  text-align: center;
  padding: 10px 0;
  color: white;
  @media (max-width: 600px) {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    background-color: red;
    margin: 24px 50px 0 50px;
    border-radius: 50px;
  }
`