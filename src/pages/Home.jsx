import { Button } from "../components/Button";
import { BlockImage, Logo } from "../components/Image";
import { NavBar } from "../components/NavBar";
import { ViewHome, ViewTop } from "../components/View";
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg';
import image2 from '../assets/image2.svg';
import { TextTop, FocusTop } from "../components/Text";
import styled from 'styled-components';

const Footer = styled.footer`
  background-color: #141740; /* Cor de fundo do footer */
  color: white;
  text-align: center;
  padding: 20px 0;
  position: relative;
  bottom: 0;
  width: 100%;
`;

const FooterText = styled.p`
  margin: 0;
  font-size: 14px;
`;

export const Home = () => {
  const navigate = useNavigate();

  return (
    <ViewHome>
      <NavBar>
        <Logo src={logo} />
        <Button onClick={() => navigate('/login')}>Login</Button>
      </NavBar>
      <ViewTop>
        <BlockImage src={image2} />
        <TextTop>Centralize suas <FocusTop>conexões</FocusTop> em um único lugar!</TextTop>
      </ViewTop>

      <Footer>
        <FooterText>&copy; {new Date().getFullYear()} DockLink. Powered by DockStar.</FooterText>
        <FooterText>Crie, personalize e compartilhe seus links de forma fácil!</FooterText>
      </Footer>
    </ViewHome>
  )
}
