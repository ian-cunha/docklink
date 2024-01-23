import { Button } from "../components/Button"
import { ViewNew } from "../components/View";
import { Message } from '../components/Message';

import { updateProfile } from "firebase/auth";
import { auth } from "../config/firebase"

import { Navigate } from 'react-router-dom'

import { useState } from "react";
import { ErrorMessage } from "../components/ErrorMessage";
import { TextH2, TextH4 } from "../components/Text";
import { InputLogin } from "../components/Form";

export const NewUser = () => {

  const [displayName, setDisplayName] = useState('')
  const [message, setMessage] = useState(true);

  const user = auth.currentUser;
  const name = user.displayName;

  const handleUpdateName = async (event) => {
    if (displayName != 0) {
      event.preventDefault()

      updateProfile(auth.currentUser, {
        displayName: displayName,
      }).then(() => {
        setMessage(
          <Message>Sucesso!</Message>
        )
        setTimeout(function () {
          setMessage(false)
        }, 2000)
      }).catch((error) => {
        alert(error)
      });
    } else {
      event.preventDefault()

      setMessage(
        <ErrorMessage>Erro!</ErrorMessage>
      )
      setTimeout(function () {
        setMessage(false)
      }, 2000)
    }
  }

  if (name != null) {
    return <Navigate to='/dashboard'></Navigate>
  }

  const handleDisplayName = (event) => setDisplayName(event.target.value)

  return (
    <ViewNew>
      {message}
      <TextH2>Bem-vindo ao Docklink.</TextH2>
      <TextH4>Agora só falta você criar seu usuário para começar...</TextH4>
      <InputLogin type="text" placeholder="Nome de usuário" onChange={handleDisplayName} />
      <Button onClick={handleUpdateName}>Confirmar</Button>
    </ViewNew>
  )
}