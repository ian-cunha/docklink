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

  // Função para buscar os dados do Firestore
  const getDataBase = async () => {
    const docRef = doc(storeApp, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setDataBase(docSnap.data());
      setLinks(docSnap.data().links || []); // Busca o array de links, ou um array vazio se não existir
    } else {
      console.log("Sem dados!");
    }
  };

  useEffect(() => {
    getDataBase();
  }, []);

  // Função para atualizar o estado dos links conforme o usuário digita
  const handleInputChange = (index, field, value) => {
    const updatedLinks = [...links];
    updatedLinks[index][field] = value;
    setLinks(updatedLinks);
  };

  // Função para validar se a URL é válida
  const isValidUrl = (url) => {
    const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocolo
      '((([a-z\\d]{1,})[a-z\\d-]{0,})\\.)+([a-z]{2,})'+ // domínio
      '(\\:[0-9]{1,5})?(\\/.*)?$', 'i'); // porta e caminho
    return pattern.test(url);
  };

  // Função para salvar ou atualizar um link no Firestore
  const saveLink = async (index) => {
    const updatedLinks = [...links];
    const newLink = links[index];
    
    if (newLink.title && newLink.url) {
      if (!isValidUrl(newLink.url)) {
        toast.error("Erro: URL inválida! Por favor, insira um link válido."); // Notificação de erro
        return;
      }
      
      await updateDoc(doc(storeApp, "users", uid), {
        links: updatedLinks, // Atualiza o array de links no Firestore
      });
      toast.success("Link atualizado com sucesso!"); // Notificação de sucesso
    } else {
      toast.error("Erro: Título e URL são obrigatórios!"); // Notificação de erro
    }
  };

  // Função para excluir um link
  const deleteLink = async (index) => {
    const updatedLinks = links.filter((_, i) => i !== index); // Remove o link do array
    await updateDoc(doc(storeApp, "users", uid), {
      links: updatedLinks, // Atualiza o array no Firestore
    });
    setLinks(updatedLinks); // Atualiza o estado local
    toast.warn("Link removido!"); // Notificação de remoção
  };

  // Função para adicionar um novo link (deixa o link vazio para ser preenchido)
  const addNewLink = () => {
    setLinks([...links, { title: "", url: "" }]);
    toast.info("Novo link adicionado!"); // Notificação de adição
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
                  <i className="bi bi-pen"></i>
                  <InputBox
                    value={link.title}
                    onChange={(e) => handleInputChange(index, 'title', e.target.value)}
                    type="text"
                    placeholder="Título"
                  />
                </InputView>
                <InputView>
                  <i className="bi bi-pen"></i>
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

      {/* Contêiner para exibir notificações */}
      <ToastContainer />
    </View>
  );
};
