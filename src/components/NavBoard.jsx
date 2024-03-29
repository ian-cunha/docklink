/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from 'react-router-dom'
import { Button, ButtonBar, Profile, Menu, ButtonProfile } from "../components/Button"
import { NavBar } from "../components/NavBar";
import { TextProfile } from './Text';
import { signOut } from "firebase/auth"
import { auth, storeApp } from "../config/firebase"
import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";

export const NavBoard = () => {

  const user = auth.currentUser;
  const uid = user.uid;

  const [dataBase, setDataBase] = useState('')

  const getDataBase = async () => {
    const docRef = doc(storeApp, "users", uid)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      setDataBase(docSnap.data())
      console.log(docSnap.data())
    } else {
      console.log("Sem dados!")
    }
  }

  useEffect(() => {
    getDataBase()
  }, [])

  const handleSignOut = () => {
    signOut(auth)
      .then(() => console.log('Sign Out'))
      .catch((error) => console.log(error))
  }

  const navigate = useNavigate();

  function dotBar() {
    var barBtn = document.getElementById('nav')
    if (barBtn.style.display === 'flex') {
      barBtn.style.display = 'none'
    } else {
      barBtn.style.display = 'flex'
    }
  }

  function profileBar() {
    var profileBtn = document.getElementById('nav-profile')
    if (profileBtn.style.display === 'flex') {
      profileBtn.style.display = 'none'
    } else {
      profileBtn.style.display = 'flex'
    }
  }

  return (
    <NavBar>
      <Menu onClick={dotBar} className="bi bi-three-dots" />
      <ButtonBar id="nav">
        <Button className="bi bi-link-45deg" onClick={() => navigate('/dashboard')}> Links</Button>
        <Button className="bi bi-app" onClick={() => navigate('/appearance')}> Aparência</Button>
        <Button className="bi bi-gear" onClick={() => navigate('/settings')}> Configurações</Button>
      </ButtonBar>
      <Profile onClick={profileBar} className="bi bi-person-circle" />
      <ButtonProfile id="nav-profile">
        <TextProfile>Olá, {dataBase.name}.</TextProfile>
        <Button className='bi bi-share' onClick={() => navigate('/'+ uid)}> Compartilhar</Button>
        <Button className='bi bi-x-circle' onClick={handleSignOut}> Sair</Button>
      </ButtonProfile>
    </NavBar>
  )
}