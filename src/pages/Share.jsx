/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useNavigate } from 'react-router-dom'
import { storeApp } from "../config/firebase"
import { doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { ImageLinking, Title, SubTitle } from "../components/Phone"
import { useParams } from "react-router-dom"
import { View, BlockBtn, LinkBtn, Logo, LogoContainer, TextLogo } from "../components/Link"
import logo from '../assets/logo.svg'

export const Share = () => {

  let { uid } = useParams()
  const navigate = useNavigate();

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
    <View>
      {dataBase.photo != 0 &&
        <ImageLinking src={dataBase.photo} />
      }
      <Title>{dataBase.name}</Title>
      <SubTitle>{dataBase.email}</SubTitle>
      {dataBase.title1 != 0 &&
        <BlockBtn>
          <LinkBtn href={dataBase.url1}>{dataBase.title1}</LinkBtn>
        </BlockBtn>
      }
      {dataBase.title2 != 0 &&
        <BlockBtn>
          <LinkBtn href={dataBase.url2}>{dataBase.title2}</LinkBtn>
        </BlockBtn>
      }
      {dataBase.title3 != 0 &&
        <BlockBtn>
          <LinkBtn href={dataBase.url3}>{dataBase.title3}</LinkBtn>
        </BlockBtn>
      }
      {dataBase.title4 != 0 &&
        <BlockBtn>
          <LinkBtn href={dataBase.url4}>{dataBase.title4}</LinkBtn>
        </BlockBtn>
      }
      {dataBase.title5 != 0 &&
        <BlockBtn>
          <LinkBtn href={dataBase.url5}>{dataBase.title5}</LinkBtn>
        </BlockBtn>
      }
      <LogoContainer onClick={() => navigate('/')}>
        <Logo src={logo} />
        <TextLogo>Docklink</TextLogo>
      </LogoContainer>
    </View>
  )
}