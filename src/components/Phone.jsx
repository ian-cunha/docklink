import styled from "styled-components";

export const PhoneStyle = styled.button`
border-style: solid;
border-color: black;
border-radius: 20px;
border-width: 20px;
height: 600px;
width: 300px;
background: #1C1C1C;
`
export const ViewStructure = styled.div`
display: flex;
align-items: center;
justify-content: center;
`

export const ImageLinking = styled.img`
width: 80px;
border-radius: 50px;
`

export const Title = styled.h2`
font-size: 1.5em;
color: white;
text-align: center;
padding: 0 15px;
`

export const SubTitle = styled.p`
font-size: 1em;
color: white;
text-align: center;
padding: 0 15px;
`

export const Blocks = styled.div`
background: black;
border-radius: 50px;
padding: 2px 0;
margin: 20px 5px;
cursor: pointer;
&:hover {
  background: #535BF2;
  color: white;
}
`