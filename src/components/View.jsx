import styled from "styled-components";

export const View = styled.div`
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
width: 100vw;
height: 100vh;
`

export const ViewHome = styled.div`
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
width: 100vw;
height: 100vh;
background: #2C3078;
`

export const ViewTop = styled.div`
display: flex;
flex-direction: row-reverse;
justify-content: center;
align-items: center;
width: 100vw;
margin-top: 150px;
padding-bottom: 50px;
@media (max-width: 768px) {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  }
`

export const ViewNew = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 100vw;
height: 100vh;
background: #535BF2;
`

export const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
background: white;
@media (max-width: 768px) {
  display: block;
  justify-content: center;
  align-items: center;
  }
`

export const BlockView = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 20px;

  @media (max-width: 1150px) {
    display: block;
    justify-content: center;
    align-items: flex-start;
    margin-top: 100px;
    width: 100vw;
    height: auto;
  }
`;

export const Block = styled.div`
animation: bounceInDown;
animation-duration: 1s;
margin: 110px 50px;
padding: 24px;
border-radius: 20px;
color: white;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
color: white;
@media (max-width: 768px) {
  margin: 24px;
  }
`

export const Items = styled.form`
background: white;
color: black;
padding: 5px 10px;
border-radius: 10px;
width: auto;
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
margin: 8px 0;
box-shadow: 5px 10px black;
@media (max-width: 1100px) {
  flex-direction: row;
  width: auto;
  }
`

export const ViewLoading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-size: 2em;
  font-weight: bold;
  color: #535BF2;
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
`

export const ViewBox = styled.div`
padding: 5px 0;
border-radius: 10px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
margin: 5px 0;
@media (max-width: 1100px) {
  flex-direction: column;
  width: 100%;
  }
`

export const ViewButtons = styled.div`
display: flex;
flex-direction: column;
@media (max-width: 1100px) {
  flex-direction: column;
  justify-content: center;
  width: 100%;
  }
`