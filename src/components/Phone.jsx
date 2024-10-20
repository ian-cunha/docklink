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
margin-top: 20px;
width: 80px;
height: 80px;
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
padding: 2px 0;
margin: 5px 5px;
`

export const Link = styled.a`
color: white;
text-decoration: none;
background: black;
padding: 15px 0;
display: block;
border-radius: 50px;
&:hover {
  background: #535BF2;
  color: white;
}
`