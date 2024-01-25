/* eslint-disable react-hooks/exhaustive-deps */
import { View, BlockView, Block, Items, ViewBox } from "../components/View"
import { Navigate } from 'react-router-dom'
import { auth, storeApp } from "../config/firebase"
import { doc, updateDoc, getDoc, deleteField } from "firebase/firestore";
import { Structure } from "../components/Structure"
import { NavBoard } from "../components/NavBoard";
import { InputBox, InputView } from "../components/Form";
import { ButtonBox } from "../components/Button";
import { useState, useEffect } from "react";

export const Dashboard = () => {

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

  const [newTitle1, setTitle1] = useState(dataBase.title1)
  const handleTitle1 = (event) => setTitle1(event.target.value)

  const [newTitle2, setTitle2] = useState(dataBase.title2)
  const handleTitle2 = (event) => setTitle2(event.target.value)

  const [newTitle3, setTitle3] = useState(dataBase.title3)
  const handleTitle3 = (event) => setTitle3(event.target.value)

  const [newTitle4, setTitle4] = useState(dataBase.title4)
  const handleTitle4 = (event) => setTitle4(event.target.value)

  const [newTitle5, setTitle5] = useState(dataBase.title5)
  const handleTitle5 = (event) => setTitle5(event.target.value)

  const [newUrl1, setUrl1] = useState(dataBase.url1)
  const handleUrl1 = (event) => setUrl1(event.target.value)

  const [newUrl2, setUrl2] = useState(dataBase.url2)
  const handleUrl2 = (event) => setUrl2(event.target.value)

  const [newUrl3, setUrl3] = useState(dataBase.url3)
  const handleUrl3 = (event) => setUrl3(event.target.value)

  const [newUrl4, setUrl4] = useState(dataBase.url4)
  const handleUrl4 = (event) => setUrl4(event.target.value)

  const [newUrl5, setUrl5] = useState(dataBase.url5)
  const handleUrl5 = (event) => setUrl5(event.target.value)

  const updateLink1 = async (event) => {
    event.preventDefault()

    await updateDoc(doc(storeApp, "users", uid), {
      title1: newTitle1,
      url1: newUrl1,
    });
    window.location.reload(false);
  }

  const updateLink2 = async (event) => {
    event.preventDefault()

    await updateDoc(doc(storeApp, "users", uid), {
      title2: newTitle2,
      url2: newUrl2,
    });
    window.location.reload(false);
  }

  const updateLink3 = async (event) => {
    event.preventDefault()

    await updateDoc(doc(storeApp, "users", uid), {
      title3: newTitle3,
      url3: newUrl3,
    });
    window.location.reload(false);
  }

  const updateLink4 = async (event) => {
    event.preventDefault()

    await updateDoc(doc(storeApp, "users", uid), {
      title4: newTitle4,
      url4: newUrl4,
    });
    window.location.reload(false);
  }

  const updateLink5 = async (event) => {
    event.preventDefault()

    await updateDoc(doc(storeApp, "users", uid), {
      title5: newTitle5,
      url5: newUrl5,
    });
    window.location.reload(false);
  }

  const deleteLink1 = async (event) => {
    event.preventDefault()

    await updateDoc(doc(storeApp, "users", uid), {
      title1: deleteField(),
      url1: deleteField(),
    });
    window.location.reload(false);
  }

  const deleteLink2 = async (event) => {
    event.preventDefault()

    await updateDoc(doc(storeApp, "users", uid), {
      title2: deleteField(),
      url2: deleteField(),
    });
    window.location.reload(false);
  }

  const deleteLink3 = async (event) => {
    event.preventDefault()

    await updateDoc(doc(storeApp, "users", uid), {
      title3: deleteField(),
      url3: deleteField(),
    });
    window.location.reload(false);
  }

  const deleteLink4 = async (event) => {
    event.preventDefault()

    await updateDoc(doc(storeApp, "users", uid), {
      title4: deleteField(),
      url4: deleteField(),
    });
    window.location.reload(false);
  }

  const deleteLink5 = async (event) => {
    event.preventDefault()

    await updateDoc(doc(storeApp, "users", uid), {
      title5: deleteField(),
      url5: deleteField(),
    });
    window.location.reload(false);
  }

  if (dataBase.name === null) {
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
                <InputBox defaultValue={dataBase.title1} value={newTitle1} onChange={handleTitle1} type="text" placeholder="Título" />
              </InputView>
              <InputView>
                <i className="bi bi-pen"></i>
                <InputBox defaultValue={dataBase.url1} value={newUrl1} onChange={handleUrl1} type="text" placeholder="URL" />
              </InputView>
            </ViewBox>
            <ViewBox>
              <ButtonBox onClick={updateLink1} type="submit" className="bi bi-cloud-upload" />
              <ButtonBox onClick={deleteLink1} type="button" className="bi bi-trash3" />
            </ViewBox>
          </Items>
          <Items>
            <ViewBox>
              <InputView>
                <i className="bi bi-pen"></i>
                <InputBox defaultValue={dataBase.title2} value={newTitle2} onChange={handleTitle2} type="text" placeholder="Título" />
              </InputView>
              <InputView>
                <i className="bi bi-pen"></i>
                <InputBox defaultValue={dataBase.url2} value={newUrl2} onChange={handleUrl2} type="text" placeholder="URL" />
              </InputView>
            </ViewBox>
            <ViewBox>
              <ButtonBox onClick={updateLink2} type="submit" className="bi bi-cloud-upload" />
              <ButtonBox onClick={deleteLink2} type="button" className="bi bi-trash3" />
            </ViewBox>
          </Items>
          <Items>
            <ViewBox>
              <InputView>
                <i className="bi bi-pen"></i>
                <InputBox defaultValue={dataBase.title3} value={newTitle3} onChange={handleTitle3} type="text" placeholder="Título" />
              </InputView>
              <InputView>
                <i className="bi bi-pen"></i>
                <InputBox defaultValue={dataBase.url3} value={newUrl3} onChange={handleUrl3} type="text" placeholder="URL" />
              </InputView>
            </ViewBox>
            <ViewBox>
              <ButtonBox onClick={updateLink3} type="submit" className="bi bi-cloud-upload" />
              <ButtonBox onClick={deleteLink3} type="button" className="bi bi-trash3" />
            </ViewBox>
          </Items>
          <Items>
            <ViewBox>
              <InputView>
                <i className="bi bi-pen"></i>
                <InputBox defaultValue={dataBase.title4} value={newTitle4} onChange={handleTitle4} type="text" placeholder="Título" />
              </InputView>
              <InputView>
                <i className="bi bi-pen"></i>
                <InputBox defaultValue={dataBase.url4} value={newUrl4} onChange={handleUrl4} type="text" placeholder="URL" />
              </InputView>
            </ViewBox>
            <ViewBox>
              <ButtonBox onClick={updateLink4} type="submit" className="bi bi-cloud-upload" />
              <ButtonBox onClick={deleteLink4} type="button" className="bi bi-trash3" />
            </ViewBox>
          </Items>
          <Items>
            <ViewBox>
              <InputView>
                <i className="bi bi-pen"></i>
                <InputBox defaultValue={dataBase.title5} value={newTitle5} onChange={handleTitle5} type="text" placeholder="Título" />
              </InputView>
              <InputView>
                <i className="bi bi-pen"></i>
                <InputBox defaultValue={dataBase.url5} value={newUrl5} onChange={handleUrl5} type="text" placeholder="URL" />
              </InputView>
            </ViewBox>
            <ViewBox>
              <ButtonBox onClick={updateLink5} type="submit" className="bi bi-cloud-upload" />
              <ButtonBox onClick={deleteLink5} type="button" className="bi bi-trash3" />
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