/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import { View, BlockView, Block } from "../components/View"
import { Message } from "../components/Message";
import { ErrorMessage } from "../components/ErrorMessage";

import { Navigate } from 'react-router-dom'
import { useState, useEffect } from "react";

import { NavBoard } from "../components/NavBoard";

import { Structure } from "../components/Structure"

import { auth, storeApp } from "../config/firebase"
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Button } from "../components/Button";
import { InputLogin } from "../components/Form";

export const Settings = () => {

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

  const [nameDisplay, setNameDisplay] = useState('')
  const [newPhoto, setNewPhoto] = useState('')
  const handleDisplayName = (event) => setNameDisplay(event.target.value)
  const handleNewPhoto = (event) => setNewPhoto(event.target.value)

  const [message, setMessage] = useState(true);

  const handleUpdateName = async (event) => {
    if (nameDisplay != 0) {
      event.preventDefault()

      await updateDoc(doc(storeApp, "users", uid), {
        name: nameDisplay,
      });
      setMessage(
        <Message>Nome atualizado!</Message>
      )
      setTimeout(function () {
        setMessage(false)
      }, 2000)
      window.location.reload(false);
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
    if (photo) {
      event.preventDefault()

      await updateDoc(doc(storeApp, "users", uid), {
        photo: newPhoto,
      });
      setMessage(
        <Message>Foto atualizada!</Message>
      )
      setTimeout(function () {
        setMessage(false)
      }, 2000)
      window.location.reload(false);
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

  if (dataBase.name === null) {
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
            <InputLogin type="name" id="name" defaultValue={dataBase.name} placeholder="Nome" onChange={handleDisplayName} />
            <Button className="bi bi-textarea-t" onClick={handleUpdateName}> Aplicar</Button>
            <InputLogin type="url" id="photo" defaultValue={dataBase.photo} placeholder="Foto de perfil" onChange={handleNewPhoto} />
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