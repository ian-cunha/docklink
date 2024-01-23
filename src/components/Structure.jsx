/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import { auth, storeApp } from "../config/firebase"
import { doc, getDoc } from "firebase/firestore"

import { useEffect, useState } from "react"

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
    <div>
      <h2>Estrutura ID:</h2>
      <p>{uid}</p>
    </div>
  )
}