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
height: 100vh;
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
align-items: center;
width: 100vw;
height: 100vh;
@media (max-width: 950px) {
  display: block;
  justify-content: center;
  align-items: center;
  margin-top: 120px;
  width: 100vw;
  height: 100vh;
  }
`

export const Block = styled.div`
margin: 250px 100px;
padding: 24px;
border-radius: 20px;
color: white;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
color: #535BF2;
@media (max-width: 768px) {
  margin: 24px;
  }
`

export const Items = styled.form`
background: white;
color: black;
padding: 5px 20px;
border-radius: 10px;
width: 300px;
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
margin: 5px 0;
@media (max-width: 768px) {
  flex-direction: column;
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