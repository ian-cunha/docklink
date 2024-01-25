import styled from "styled-components";

export const Logo = styled.img`
width: 100px;
height: auto;
padding: 18px;
`

export const LogoLogin = styled.img`
animation: fadeInDown;
animation-duration: 1s;
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
animation: fadeInRight;
animation-duration: 2s;
width: 400px;
z-index: 1;
margin: 24px;
right: 0;
@media (max-width: 768px) {
  animation: zoomInDown;
  animation-duration: 2s;
  margin: 80px 24px 0 0;
  width: 300px;
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