import styled from "styled-components";

export const Button = styled.button`
border-radius: 100px;
background: black;
padding: 10px 30px;
margin: 14px;
border-style: none;
font-size: 1.2em;
font-weight: 600;
border-style: solid;
border-color: transparent;
cursor: pointer;
&:hover {
  transition: 0.6s all; 
  background: #535BF2;
  border-color: rgba(255, 255, 255, 0.87);
  border-style: solid;
}
`

export const ButtonSubmit = styled.button`
transition: 0.6s all; 
animation: zoomIn;
animation-duration: 1s;
border-radius: 100px;
background: #535BF2;
padding: 10px 30px;
margin: 14px;
border-style: none;
font-size: 1.5em;
width: 600px;
font-weight: 600;
cursor: pointer;
box-shadow: 0 5px black;
&:hover {
  background: white;
  color: #535BF2;
}
@media (max-width: 1300px) {
  width: 400px;
  }
@media (max-width: 1200px) {
  width: 300px;
  }
`

export const Profile = styled.button`
border-radius: 100px;
margin: 14px;
border-style: none;
font-size: 3em;
font-weight: 600;
border-color: transparent;
background: transparent;
color: black;
z-index: 1;
cursor: pointer;
&:hover {
  transition: 0.6s all; 
  color: #535BF2;
};
`

export const Menu = styled.button`
border-radius: 100px;
margin: 14px;
border-style: none;
font-size: 3em;
font-weight: 600;
border-color: transparent;
background: transparent;
color: black;
display: none;
cursor: pointer;
&:hover {
  color: #535BF2;
};
@media (max-width: 768px) {
  display: block;
  }
`

export const ButtonBar = styled.nav`
display: flex;
@media (max-width: 768px) {
  animation: bounceInDown;
  animation-duration: 1s;
  display: none;
  flex-direction: column;
  position: absolute;
  background: white;
  border-radius: 30px;
  z-index: 10;
  left: 0;
  right: 0;
  margin-top: 90px;
  box-shadow: 0 10px black;
  }
`

export const ButtonProfile = styled.nav`
  display: none;
  flex-direction: column;
  position: absolute;
  background: white;
  border-radius: 30px;
  z-index: 10;
  right: 0;
  margin-top: 90px;
  padding: 5px 5px;
  box-shadow: 5px 10px black;
  animation: bounceInDown;
  animation-duration: 1s;
@media (max-width: 768px) {
  display: none;
  flex-direction: column;
  position: absolute;
  background: white;
  border-radius: 30px;
  z-index: 10;
  right: 0;
  margin-top: 90px;
  }
`

export const ButtonBox = styled.button`
font-size: 2em;
font-weight: 600;
border-color: transparent;
background: transparent;
color: black;
cursor: pointer;
&:hover {
  color: #535BF2;
};
`

export const ButtonPlus = styled.button`
border-radius: 100px;
background: black;
padding: 10px 30px;
margin: 14px;
border-style: none;
font-size: 1.2em;
font-weight: 600;
border-style: solid;
border-color: transparent;
cursor: pointer;
&:hover {
  transition: 0.6s all; 
  background: #535BF2;
  border-color: rgba(255, 255, 255, 0.87);
  border-style: solid;
}
`
