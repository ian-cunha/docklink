/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { Container } from "../components/View"
import { ButtonSubmit } from "../components/Button"
import { Login, FieldLogin, InputLogin } from "../components/Form"
import { Linking } from "../components/Linking"
import { ImageLogin, LogoLogin } from "../components/Image"
import { LegendLogin } from "../components/Text"

import loginImage from '../assets/login.svg'
import fullLogo from '../assets/fullLogo.svg'

import { Navigate } from 'react-router-dom'
import { useState } from "react"

import { ErrorMessage } from "../components/ErrorMessage"

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth"
import { auth, storeApp } from "../config/firebase"
import { doc, setDoc } from "firebase/firestore";

export const LoginRegister = ({ user }) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(true);
  const [isSignUpActive, setIsSignUpActive] = useState(false)
  const handleMethodChange = () => {
    setIsSignUpActive(!isSignUpActive)
  }

  const handleSignUp = () => {
    if (!email || !password || password === confirmPassword) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;

          const uid = user.uid;
          const newUser = async () => {
            await setDoc(doc(storeApp, "users", uid), {
              name: null,
            });
          }
          newUser()
          
          console.log(user)
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage)
          setMessage(
            <ErrorMessage>Email ou Senha inválido!</ErrorMessage>
          )
          setTimeout(function () {
            setMessage(false)
          }, 2000)
        });
    } else {
      setMessage(
        <ErrorMessage>Email ou Senha inválido!</ErrorMessage>
      )
      setTimeout(function () {
        setMessage(false)
      }, 2000)
    }
  }

  const handleSignIn = () => {
    if (!email || !password) return
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
        setMessage(
          <ErrorMessage>Email ou Senha inválido!</ErrorMessage>
        )
        setTimeout(function () {
          setMessage(false)
        }, 2000)
      });
  }

  const handleEmailChange = (event) => setEmail(event.target.value)
  const handlePasswordChange = (event) => setPassword(event.target.value)
  const handleConfirmPasswordChange = (event) => setConfirmPassword(event.target.value)

  if (user) {
    return <Navigate to='/dashboard'></Navigate>
  }

  return (
    <Container>
      {message}
      <Login>
        <LogoLogin src={fullLogo} />
        {isSignUpActive && <LegendLogin>Registre gratuitamente!</LegendLogin>}
        {!isSignUpActive && <LegendLogin>Bem-vindo de volta!</LegendLogin>}
        <FieldLogin>
          <InputLogin type="email" placeholder="Email" onChange={handleEmailChange} />
          <InputLogin type="password" placeholder="Senha" onChange={handlePasswordChange} />
          {isSignUpActive && <InputLogin type="password" placeholder="Repetir senha" onChange={handleConfirmPasswordChange} />}
          {isSignUpActive && <ButtonSubmit type="button" onClick={handleSignUp}>Criar Conta</ButtonSubmit>}
          {!isSignUpActive && <ButtonSubmit type="button" onClick={handleSignIn}>Login</ButtonSubmit>}
        </FieldLogin>
        {isSignUpActive && <Linking onClick={handleMethodChange}>Já possui uma conta? Faça login</Linking>}
        {!isSignUpActive && <Linking onClick={handleMethodChange}>Não possui uma conta? Registre-se</Linking>}
      </Login>
      <ImageLogin src={loginImage} />
    </Container>
  )
}