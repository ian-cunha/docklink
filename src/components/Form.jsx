import styled from "styled-components";

export const Login = styled.form`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 50vw;
height: 100vh;
@media (max-width: 768px) {
  width: 100vw;
  }
`

export const FieldLogin = styled.fieldset`
animation: zoomIn;
animation-duration: 1s;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
border:0 none;
`

export const InputLogin = styled.input`
background: white;
border-radius: 50px;
width: 600px;
height: 50px;
margin: 5px 0;
border-style: solid;
border-color: rgba(200, 200, 200, 0.87);
padding: 0 20px;
font-size: 1.2em;
color: black;
&:valid {
  color: black;
}
@media (max-width: 1300px) {
  width: 450px;
  height: 50px;
  }
@media (max-width: 1100px) {
  width: 300px;
  height: 50px;
  }
`

export const InputBox = styled.input`
width: 40vw;
height: 30px;
background: white;
border-radius: 5px;
margin: 10px;
font-size: 1em;
font-weight: 600;
border: dashed 1px;
color: black;
@media (max-width: 1100px) {
  width: 50vw;
  }
`

export const InputView = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
`