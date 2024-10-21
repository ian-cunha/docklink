/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from 'react-router-dom';
import { Button, ButtonBar, Profile, Menu, ButtonProfile } from "../components/Button";
import { NavBar } from "../components/NavBar";
import { TextProfile } from './Text';
import { signOut } from "firebase/auth";
import { auth, storeApp } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect, useRef } from "react";

export const NavBoard = () => {
  const user = auth.currentUser;
  const uid = user.uid;

  const [dataBase, setDataBase] = useState('');
  const profileRef = useRef(null);
  const menuRef = useRef(null);

  const getDataBase = async () => {
    const docRef = doc(storeApp, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setDataBase(docSnap.data());
      console.log(docSnap.data());
    } else {
      console.log("Sem dados!");
    }
  };

  useEffect(() => {
    getDataBase();
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => console.log('Sign Out'))
      .catch((error) => console.log(error));
  };

  const navigate = useNavigate();

  function dotBar() {
    const barBtn = document.getElementById('nav');
    if (barBtn.style.display === 'flex') {
      barBtn.style.display = 'none';
    } else {
      barBtn.style.display = 'flex';
    }
  }

  function profileBar() {
    const profileBtn = document.getElementById('nav-profile');
    if (profileBtn.style.display === 'flex') {
      profileBtn.style.display = 'none';
    } else {
      profileBtn.style.display = 'flex';
    }
  }

  // Fecha o ButtonProfile e o Menu ao clicar fora, somente em telas menores que 768px
  useEffect(() => {
    const handleClickOutsideProfile = (event) => {
      if (window.matchMedia("(max-width: 768px)").matches) {
        if (profileRef.current && !profileRef.current.contains(event.target)) {
          document.getElementById('nav-profile').style.display = 'none';
        }
      }
    };

    const handleClickOutsideMenu = (event) => {
      if (window.matchMedia("(max-width: 768px)").matches) {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          document.getElementById('nav').style.display = 'none';
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutsideProfile);
    document.addEventListener('mousedown', handleClickOutsideMenu);

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideProfile);
      document.removeEventListener('mousedown', handleClickOutsideMenu);
    };
  }, []);

  return (
    <NavBar>
      <Menu onClick={dotBar} className="bi bi-three-dots" />
      <ButtonBar id="nav" ref={menuRef}> {/* Adiciona a referência ao Menu */}
        <Button className="bi bi-link-45deg" onClick={() => navigate('/dashboard')}> Links</Button>
        <Button className="bi bi-app" onClick={() => navigate('/appearance')}> Aparência</Button>
        <Button className="bi bi-gear" onClick={() => navigate('/settings')}> Configurações</Button>
      </ButtonBar>
      <Profile onClick={profileBar} className="bi bi-person-circle" />
      <ButtonProfile id="nav-profile" ref={profileRef}> {/* Adiciona a referência ao Profile */}
        {dataBase.name && <TextProfile>Olá, {dataBase.name}.</TextProfile>} {/* Exibe o nome do usuário */}
        <Button className='bi bi-share' onClick={() => navigate('/' + dataBase.name)}> Compartilhar</Button>
        <Button className='bi bi-x-circle' onClick={handleSignOut}> Sair</Button>
      </ButtonProfile>
    </NavBar>
  );
};
