/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import { auth, storeApp } from "../config/firebase"
import { doc, getDoc } from "firebase/firestore"

import { useEffect, useState } from "react"

import { Link, PhoneStyle, ViewStructure, ImageLinking, Title, SubTitle, Blocks } from "./Phone"

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
        {dataBase.photo != 0 &&
          <ImageLinking src={dataBase.photo} />
        }
        <Title>{dataBase.name}</Title>
        <SubTitle>{dataBase.email}</SubTitle>
        {dataBase.title1 != 0 &&
          <Blocks>
            <Link href={dataBase.url1}>{dataBase.title1}</Link>
          </Blocks>
        }
        {dataBase.title2 != 0 &&
          <Blocks>
            <Link href={dataBase.url2}>{dataBase.title2}</Link>
          </Blocks>
        }
        {dataBase.title3 != 0 &&
          <Blocks>
            <Link href={dataBase.url3}>{dataBase.title3}</Link>
          </Blocks>
        }
        {dataBase.title4 != 0 &&
          <Blocks>
            <Link href={dataBase.url4}>{dataBase.title4}</Link>
          </Blocks>
        }
        {dataBase.title5 != 0 &&
          <Blocks>
            <Link href={dataBase.url5}>{dataBase.title5}</Link>
          </Blocks>
        }
      </PhoneStyle>
    </ViewStructure>
  )
}