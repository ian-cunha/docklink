/* eslint-disable react-hooks/exhaustive-deps */
import { View, BlockView, Block, Items, ViewBox, ViewButtons } from "../components/View";
import { Navigate } from 'react-router-dom';
import { auth, storeApp } from "../config/firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { Structure } from "../components/Structure";
import { NavBoard } from "../components/NavBoard";
import { InputBox, InputView } from "../components/Form";
import { ButtonBox, ButtonPlus } from "../components/Button";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Dashboard = () => {
  const user = auth.currentUser;
  const uid = user.uid;

  const [dataBase, setDataBase] = useState({});
  const [links, setLinks] = useState([]);

  const getDataBase = async () => {
    const docRef = doc(storeApp, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setDataBase(docSnap.data());
      setLinks(docSnap.data().links || []);
    } else {
      console.log("Sem dados!");
    }
  };

  useEffect(() => {
    getDataBase();
  }, []);

  const handleInputChange = (index, field, value) => {
    const updatedLinks = [...links];
    updatedLinks[index][field] = value;
    setLinks(updatedLinks);
  };

  const isValidUrl = (url) => {
    const pattern = new RegExp('^(https?:\\/\\/)?' +
      '((([a-z\\d]{1,})[a-z\\d-]{0,})\\.)+([a-z]{2,})' +
      '(\\:[0-9]{1,5})?(\\/.*)?$', 'i');
    return pattern.test(url);
  };

  const saveLink = async (index) => {
    const updatedLinks = [...links];
    const newLink = links[index];

    if (newLink.title && newLink.url) {
      if (!isValidUrl(newLink.url)) {
        toast.error("Erro: URL inválida! Por favor, insira um link válido.");
        return;
      }

      await updateDoc(doc(storeApp, "users", uid), {
        links: updatedLinks,
      });
      toast.success("Link atualizado com sucesso!");
    } else {
      toast.error("Erro: Título e URL são obrigatórios!");
    }
  };

  const deleteLink = async (index) => {
    const updatedLinks = links.filter((_, i) => i !== index);
    await updateDoc(doc(storeApp, "users", uid), {
      links: updatedLinks,
    });
    setLinks(updatedLinks);
    toast.warn("Link removido!");
  };

  const addNewLink = () => {
    setLinks([...links, { title: "", url: "" }]);
    toast.info("Novo link adicionado!");
  };

  if (dataBase.name === null) {
    return <Navigate to='/welcome' />;
  }

  return (
    <View>
      <NavBoard />
      <BlockView>
        <Block>
          {links.map((link, index) => (
            <Items key={index}>
              <ViewBox>
                <InputView>
                  <InputBox
                    value={link.title}
                    onChange={(e) => handleInputChange(index, 'title', e.target.value)}
                    type="text"
                    placeholder="Título"
                  />
                </InputView>
                <InputView>
                  <InputBox
                    value={link.url}
                    onChange={(e) => handleInputChange(index, 'url', e.target.value)}
                    type="text"
                    placeholder="URL"
                  />
                </InputView>
              </ViewBox>
              <ViewBox>
                <ViewButtons>
                  <ButtonBox onClick={() => saveLink(index)} type="button" className="bi bi-save"></ButtonBox>
                  <ButtonBox onClick={() => deleteLink(index)} type="button" className="bi bi-trash3" />
                </ViewButtons>
              </ViewBox>
            </Items>
          ))}
          <ButtonPlus onClick={addNewLink} type="button" className="bi bi-plus"> Adicionar</ButtonPlus>
        </Block>
        <Block>
          <Structure />
        </Block>
      </BlockView>

      <ToastContainer />
    </View>
  );
};
