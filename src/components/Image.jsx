import styled from "styled-components";

export const Logo = styled.img`
width: 100px;
height: auto;
padding: 18px;
`

export const LogoLogin = styled.img`
width: 200px;
height: auto;
padding: 18px;
`

export const Image = styled.img`
position: absolute;
width: 100vw;
@media (max-width: 600px) {
  width: auto;
  }
`
export const BlockImage = styled.img`
position: absolute;
width: 400px;
z-index: 1;
margin: 80px;
right: 0;
@media (max-width: 768px) {
  width: 80vw;
  padding-top: 500px;
  margin: 24px;
  }
`

export const ImageLogin = styled.img`
width: 50vw;
height: 100vh;
@media (max-width: 600px) {
  width: 100vw;
  display: none;
  }
`