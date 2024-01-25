/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "../components/Button"
import { ViewNew } from "../components/View";

import { auth, storeApp } from "../config/firebase"
import { doc, setDoc, getDoc } from "firebase/firestore";

import { useEffect } from "react"

import { Navigate } from 'react-router-dom'

import { useState } from "react";
import { TextH2, TextH4 } from "../components/Text";
import { InputLogin } from "../components/Form";

export const NewUser = () => {


  const [nameDisplay, setNameDisplay] = useState('')
  const handleNameDisplay = (event) => setNameDisplay(event.target.value)

  const user = auth.currentUser;
  const uid = user.uid;
  const email = user.email;

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

  const newUser = async (event) => {
    event.preventDefault()

    await setDoc(doc(storeApp, "users", uid), {
      started: new Date(),
      name: nameDisplay,
      email: email,
    });

    window.location.reload(false);
  }

  useEffect(() => {
    getDataBase()
  }, [])

  if (dataBase.name != null) {
    return <Navigate to='/dashboard'></Navigate>
  }

  return (
    <ViewNew>
      <TextH2>Bem-vindo ao Docklink.</TextH2>
      <TextH4>Agora só falta você criar seu usuário para começar...</TextH4>
      <InputLogin type="text" placeholder="Nome de usuário" onChange={handleNameDisplay} />
      <Button onClick={newUser}>Confirmar</Button>
    </ViewNew>
  )
}