import styled from "styled-components";

export const View = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: black;
  width: 100vw;
  min-height: 100vh;
  
  @media (max-width: 768px) {
    width: 100vw;
  }
`;

export const ViewStructure = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`

export const BlockBtn = styled.div`
animation: pulse;
animation-duration: 1s;
padding: 2px 0;
margin: 5px 5px;
width: 500px;
text-align: center;
@media (max-width: 768px) {
  width: 90vw;
  }
`

export const LinkBtn = styled.a`
color: white;
text-decoration: none;
padding: 15px 0;
display: block;
border-style: solid;
border-width: 1px;
border-radius: 50px;
  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
`

export const Logo = styled.img`
width: 50px;
height: auto;
`

export const LogoContainer = styled.a`
margin-top: 50px;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
cursor: pointer;
`

export const TextLogo = styled.h3`
font-size: 0.8em;
color: white;
`