/* eslint-disable no-undef */
import { View, BlockView, Block } from "../components/View"
import { Message } from "../components/Message";
import { ErrorMessage } from "../components/ErrorMessage";

import { Navigate } from 'react-router-dom'
import { useState } from "react"

import { NavBoard } from "../components/NavBoard";

import { Structure } from "../components/Structure"

import { updateProfile } from "firebase/auth";

import { auth } from "../config/firebase"
import { Button } from "../components/Button";
import { InputLogin } from "../components/Form";

export const Settings = () => {

  const [displayName, setDisplayName] = useState('')
  const [newPhoto, setNewPhoto] = useState('')
  const handleDisplayName = (event) => setDisplayName(event.target.value)
  const handleNewPhoto = (event) => setNewPhoto(event.target.value)

  const [message, setMessage] = useState(true);

  const user = auth.currentUser;
  const name = user.displayName;
  const photo = user.photoURL;

  const handleUpdateName = async (event) => {
    if (displayName != 0) {
      event.preventDefault()

      updateProfile(auth.currentUser, {
        displayName: displayName,
      }).then(() => {
        setMessage(
          <Message>Nome atualizado!</Message>
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
        <ErrorMessage>Erro, nome está vazio ou igual!</ErrorMessage>
      )
      setTimeout(function () {
        setMessage(false)
      }, 2000)
    }
  }

  const handleUpdatePhoto = async (event) => {
    if (photo != 0) {
      event.preventDefault()

      updateProfile(auth.currentUser, {
        photoURL: newPhoto,
      }).then(() => {
        setMessage(
          <Message>Foto atualizado!</Message>
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
        <ErrorMessage>Erro, foto está igual!</ErrorMessage>
      )
      setTimeout(function () {
        setMessage(false)
      }, 2000)
    }
  }

  if (name === null) {
    return <Navigate to='/welcome'></Navigate>
  }

  return (
    <View>
      {message}
      <NavBoard />
      <BlockView>
        <Block>
          <div>
            <h2>Configurações</h2>
            <InputLogin type="name" id="name" defaultValue={name} placeholder="Nome" onChange={handleDisplayName} />
            <Button className="bi bi-textarea-t" onClick={handleUpdateName}> Aplicar</Button>
            <InputLogin type="url" id="photo" defaultValue={photo} placeholder="Foto de perfil" onChange={handleNewPhoto} />
            <Button className="bi bi-image" onClick={handleUpdatePhoto}> Aplicar</Button>
          </div>
        </Block>
        <Block>
          <Structure />
        </Block>
      </BlockView>
    </View>
  )
}