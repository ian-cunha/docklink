import styled from "styled-components";

export const TextTop = styled.h2`
animation: fadeInLeft;
animation-duration: 2s;
z-index: 1;
font-size: 4.5em;
line-height: 80px;
font-weight: 600;
color: white;
text-align: left;
width: 600px;
@media (max-width: 768px) {
  margin: 24px;
  text-align: center;
  font-size: 4em;
  width: 90vw;
  line-height: 70px;
  }
  @media (max-width: 550px) {
  animation: zoomInUp;
  animation-duration: 2s;
  font-size: 2.5em;
  width: 90vw;
  line-height: 35px;
  }
`

export const TextH2 = styled.h2`
font-size: 4em;
line-height: 1em;
font-weight: 600;
color: white;
text-align: center;
padding: 0 15px;
`

export const TextH4 = styled.h4`
font-size: 1.8em;
line-height: 1.3em;
font-weight: 200;
color: white;
text-align: center;
padding: 0 15px;
`

export const FocusTop = styled.b`
color: #535BF2;
`

export const LegendLogin = styled.b`
animation: zoomIn;
animation-duration: 1s;
color: black;
font-weight: 300;
font-size: 1.3em;
margin-bottom: 45px;
`

export const TextProfile = styled.b`
color: black;
font-weight: 300;
font-size: 1.3em;
text-align: center;
margin: 12px 0;
`