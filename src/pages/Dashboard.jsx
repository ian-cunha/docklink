/* eslint-disable react-hooks/exhaustive-deps */
import { View, BlockView, Block, Items, ViewBox } from "../components/View"

import { Navigate } from 'react-router-dom'

import { auth, storeApp } from "../config/firebase"
import { doc, updateDoc, getDoc } from "firebase/firestore";

import { Structure } from "../components/Structure"
import { NavBoard } from "../components/NavBoard";
import { InputBox, InputView } from "../components/Form";
import { ButtonBox } from "../components/Button";

import { useState, useEffect } from "react";

export const Dashboard = () => {

  const user = auth.currentUser;
  const name = user.displayName;
  const uid = user.uid;

  const [title1, setTitle1] = useState('')
  const handleTitle1 = (event) => setTitle1(event.target.value)

  const [title2, setTitle2] = useState('')
  const handleTitle2 = (event) => setTitle2(event.target.value)

  const [title3, setTitle3] = useState('')
  const handleTitle3 = (event) => setTitle3(event.target.value)

  const [title4, setTitle4] = useState('')
  const handleTitle4 = (event) => setTitle4(event.target.value)

  const [title5, setTitle5] = useState('')
  const handleTitle5 = (event) => setTitle5(event.target.value)

  const [url1, setUrl1] = useState('')
  const handleUrl1 = (event) => setUrl1(event.target.value)

  const [url2, setUrl2] = useState('')
  const handleUrl2 = (event) => setUrl2(event.target.value)

  const [url3, setUrl3] = useState('')
  const handleUrl3 = (event) => setUrl3(event.target.value)

  const [url4, setUrl4] = useState('')
  const handleUrl4 = (event) => setUrl4(event.target.value)

  const [url5, setUrl5] = useState('')
  const handleUrl5 = (event) => setUrl5(event.target.value)

  const updateLink1 = async (event) => {
    event.preventDefault()

    await updateDoc(doc(storeApp, "profiles", uid), {
      title1: title1,
      url1: url1,
    });
  }

  const updateLink2 = async (event) => {
    event.preventDefault()

    await updateDoc(doc(storeApp, "profiles", uid), {
      title2: title2,
      url2: url2,
    });
  }

  const updateLink3 = async (event) => {
    event.preventDefault()

    await updateDoc(doc(storeApp, "profiles", uid), {
      title3: title3,
      url3: url3,
    });
  }

  const updateLink4 = async (event) => {
    event.preventDefault()

    await updateDoc(doc(storeApp, "profiles", uid), {
      title4: title4,
      url4: url4,
    });
  }

  const updateLink5 = async (event) => {
    event.preventDefault()

    await updateDoc(doc(storeApp, "profiles", uid), {
      title5: title5,
      url5: url5,
    });
  }

  const [dataBase, setDataBase] = useState('')

  const getDataBase = async () => {
    const docRef = doc(storeApp, "profiles", uid)
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

  if (name === null) {
    return <Navigate to='/welcome'></Navigate>
  }

  return (
    <View>
      <NavBoard />
      <BlockView>
        <Block>
          <Items>
            <ViewBox>
              <InputView>
                <i className="bi bi-pen"></i>
                <InputBox defaultValue={dataBase.title1} onChange={handleTitle1} type="text" placeholder="Título" />
              </InputView>
              <InputView>
                <i className="bi bi-pen"></i>
                <InputBox defaultValue={dataBase.url1} onChange={handleUrl1} type="text" placeholder="URL" />
              </InputView>
            </ViewBox>
            <ViewBox>
              <ButtonBox onClick={updateLink1} type="submit" className="bi bi-cloud-upload" />
            </ViewBox>
          </Items>
          <Items>
            <ViewBox>
              <InputView>
                <i className="bi bi-pen"></i>
                <InputBox defaultValue={dataBase.title2} onChange={handleTitle2} type="text" placeholder="Título" />
              </InputView>
              <InputView>
                <i className="bi bi-pen"></i>
                <InputBox defaultValue={dataBase.url2} onChange={handleUrl2} type="text" placeholder="URL" />
              </InputView>
            </ViewBox>
            <ViewBox>
              <ButtonBox onClick={updateLink2} type="submit" className="bi bi-cloud-upload" />
            </ViewBox>
          </Items>
          <Items>
            <ViewBox>
              <InputView>
                <i className="bi bi-pen"></i>
                <InputBox defaultValue={dataBase.title3} onChange={handleTitle3} type="text" placeholder="Título" />
              </InputView>
              <InputView>
                <i className="bi bi-pen"></i>
                <InputBox defaultValue={dataBase.url3} onChange={handleUrl3} type="text" placeholder="URL" />
              </InputView>
            </ViewBox>
            <ViewBox>
              <ButtonBox onClick={updateLink3} type="submit" className="bi bi-cloud-upload" />
            </ViewBox>
          </Items>
          <Items>
            <ViewBox>
              <InputView>
                <i className="bi bi-pen"></i>
                <InputBox defaultValue={dataBase.title4} onChange={handleTitle4} type="text" placeholder="Título" />
              </InputView>
              <InputView>
                <i className="bi bi-pen"></i>
                <InputBox defaultValue={dataBase.url4} onChange={handleUrl4} type="text" placeholder="URL" />
              </InputView>
            </ViewBox>
            <ViewBox>
              <ButtonBox onClick={updateLink4} type="submit" className="bi bi-cloud-upload" />
            </ViewBox>
          </Items>
          <Items>
            <ViewBox>
              <InputView>
                <i className="bi bi-pen"></i>
                <InputBox defaultValue={dataBase.title5} onChange={handleTitle5} type="text" placeholder="Título" />
              </InputView>
              <InputView>
                <i className="bi bi-pen"></i>
                <InputBox defaultValue={dataBase.url5} onChange={handleUrl5} type="text" placeholder="URL" />
              </InputView>
            </ViewBox>
            <ViewBox>
              <ButtonBox onClick={updateLink5} type="submit" className="bi bi-cloud-upload" />
            </ViewBox>
          </Items>
        </Block>
        <Block>
          <Structure />
        </Block>
      </BlockView>
    </View>
  )
}