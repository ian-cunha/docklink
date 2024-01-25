/* eslint-disable react-hooks/exhaustive-deps */
import { View, BlockView, Block } from "../components/View"
import { Navigate } from 'react-router-dom'
import { NavBoard } from "../components/NavBoard";
import { Structure } from "../components/Structure"
import { auth, storeApp } from "../config/firebase"
import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";

export const Appearance = () => {

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

  if (dataBase.name === null) {
    return <Navigate to='/welcome'></Navigate>
  }

  return (
    <View>
      <NavBoard />
      <BlockView>
        <Block>
          <div>
            <h2>Aparência</h2>
          </div>
        </Block>
        <Block>
          <Structure />
        </Block>
      </BlockView>
    </View>
  )
}