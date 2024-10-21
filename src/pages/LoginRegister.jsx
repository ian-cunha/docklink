import { useState } from "react";
import { Navigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, storeApp } from "../config/firebase";

import { Container } from "../components/View";
import { ButtonSubmit } from "../components/Button";
import { Login, FieldLogin, InputLogin } from "../components/Form";
import { Linking } from "../components/Linking";
import { ImageLogin, LogoLogin } from "../components/Image";
import { LegendLogin } from "../components/Text";
import { ErrorMessage } from "../components/ErrorMessage";

import loginImage from '../assets/login.svg';
import fullLogo from '../assets/fullLogo.svg';

export const LoginRegister = ({ user }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(true);
  const [isSignUpActive, setIsSignUpActive] = useState(false);

  const handleMethodChange = () => setIsSignUpActive(!isSignUpActive);

  const handleSignUp = () => {
    if (email && password === confirmPassword) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const { user } = userCredential;
          setDoc(doc(storeApp, "users", user.uid), { name: null });
        })
        .catch(() => {
          setMessage(<ErrorMessage>Email ou Senha inválido!</ErrorMessage>);
          setTimeout(() => setMessage(false), 2000);
        });
    } else {
      setMessage(<ErrorMessage>Email ou Senha inválido!</ErrorMessage>);
      setTimeout(() => setMessage(false), 2000);
    }
  };

  const handleSignIn = () => {
    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => console.log(userCredential.user))
        .catch(() => {
          setMessage(<ErrorMessage>Email ou Senha inválido!</ErrorMessage>);
          setTimeout(() => setMessage(false), 2000);
        });
    }
  };

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleConfirmPasswordChange = (event) => setConfirmPassword(event.target.value);

  if (user) return <Navigate to="/dashboard" />;

  return (
    <Container>
      {message}
      <Login>
        <LogoLogin src={fullLogo} />
        <LegendLogin>{isSignUpActive ? "Registre gratuitamente!" : "Bem-vindo de volta!"}</LegendLogin>
        <FieldLogin>
          <InputLogin type="email" placeholder="Email" onChange={handleEmailChange} />
          <InputLogin type="password" placeholder="Senha" onChange={handlePasswordChange} />
          {isSignUpActive && (
            <>
              <InputLogin type="password" placeholder="Repetir senha" onChange={handleConfirmPasswordChange} />
              <ButtonSubmit type="button" onClick={handleSignUp}>Criar Conta</ButtonSubmit>
            </>
          )}
          {!isSignUpActive && <ButtonSubmit type="button" onClick={handleSignIn}>Login</ButtonSubmit>}
        </FieldLogin>
        <Linking onClick={handleMethodChange}>
          {isSignUpActive ? "Já possui uma conta? Faça login" : "Não possui uma conta? Registre-se"}
        </Linking>
      </Login>
      <ImageLogin src={loginImage} />
    </Container>
  );
};
