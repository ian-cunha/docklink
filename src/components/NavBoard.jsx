import { useNavigate } from 'react-router-dom'

import { Button, ButtonBar, Profile, Menu } from "../components/Button"
import { NavBar } from "../components/NavBar";

export const NavBoard = () => {

  const navigate = useNavigate();

  function dotBar() {
    var barBtn = document.getElementById('nav')
    if (barBtn.style.display === 'flex') {
      barBtn.style.display = 'none'
    } else {
      barBtn.style.display = 'flex'
    }
  }

  return (
    <NavBar>
      <Menu onClick={dotBar} className="bi bi-three-dots" />
      <ButtonBar id="nav">
        <Button className="bi bi-app" onClick={() => navigate('/dashboard')}> Aparência</Button>
        <Button className="bi bi-link-45deg" onClick={() => navigate('/link')}> Link</Button>
        <Button className="bi bi-gear" onClick={() => navigate('/settings')}> Configurações</Button>
      </ButtonBar>
      <Profile className="bi bi-person-circle" />
    </NavBar>
  )
}