/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import { auth, storeApp } from "../config/firebase"
import { doc, getDoc } from "firebase/firestore"

import { useEffect, useState } from "react"

import { PhoneStyle, ViewStructure, ImageLinking, Title, SubTitle, Blocks } from "./Phone"

export const Structure = () => {

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

  return (
    <ViewStructure>
      <PhoneStyle>
        <ImageLinking src={'https://static.vecteezy.com/ti/vetor-gratis/p1/18765757-icone-de-perfil-de-usuario-em-estilo-simples-ilustracao-em-avatar-membro-no-fundo-isolado-conceito-de-negocio-de-sinal-de-permissao-humana-vetor.jpg'} />
        <Title>Nome</Title>
        <SubTitle>email@gmail.com</SubTitle>
        <Blocks>
          <p>GitHub</p>
        </Blocks>
        <Blocks>
          <p>Instagram</p>
        </Blocks>
        <Blocks>
          <p>Linkedin</p>
        </Blocks>
        <Blocks>
          <p>Behance</p>
        </Blocks>
        <Blocks>
          <p>Dockfolio</p>
        </Blocks>
      </PhoneStyle>
    </ViewStructure>
  )
}