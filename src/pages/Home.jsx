import { Button } from "../components/Button"
import { BlockImage, Logo } from "../components/Image";
import { NavBar } from "../components/NavBar";
import { ViewHome, ViewTop } from "../components/View";

import { useNavigate } from 'react-router-dom'

import logo from '../assets/logo.svg'
import image2 from '../assets/image2.svg'
import { TextTop, FocusTop } from "../components/Text";

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
    </ViewHome>
  )
}