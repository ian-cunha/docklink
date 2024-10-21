/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components';
import { View, BlockView, Block } from "../components/View";
import { Navigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { NavBoard } from "../components/NavBoard";
import { Structure } from "../components/Structure";
import { auth, storeApp, storage } from "../config/firebase";
import { doc, getDoc, updateDoc, deleteField, query, where, getDocs, collection } from "firebase/firestore";
import { Button } from "../components/Button";
import { InputLogin } from "../components/Form";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const File = styled.div`
  margin-top: 30px;
  margin-bottom: 10px;
`;

const FileInput = styled.input`
  display: none; /* Oculta o input padrão */
`;

const FileLabel = styled.label`
  border-radius: 100px;
  background: white;
  color: black;
  padding: 10px 80px;
  border-style: none;
  font-size: 1.2em;
  font-weight: 600;
  border-style: solid;
  border-color: transparent;
  cursor: pointer;
  
  &:hover {
    transition: 0.6s all;
    background: #535BF2;
    border-color: rgba(255, 255, 255, 0.87);
    border-style: solid;
    color: white;
  }
`;

export const Settings = () => {
  const user = auth.currentUser;
  const uid = user.uid;

  const [dataBase, setDataBase] = useState('');
  const [nameDisplay, setNameDisplay] = useState('');
  const [photoFile, setPhotoFile] = useState(null);

  const getDataBase = async () => {
    const docRef = doc(storeApp, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setDataBase(docSnap.data());
      setNameDisplay(docSnap.data().name);
    } else {
      console.log("Sem dados!");
    }
  };

  useEffect(() => {
    getDataBase();
  }, []);

  const handleDisplayName = (event) => setNameDisplay(event.target.value);

  const handlePhotoFileChange = (event) => setPhotoFile(event.target.files[0]);

  const checkNameAvailability = async (name) => {
    const usersRef = collection(storeApp, "users");
    const q = query(usersRef, where("name", "==", name));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };

  const handleUpdateName = async (event) => {
    event.preventDefault();
    if (nameDisplay.trim() === '' || nameDisplay.includes(' ')) {
      toast.error("Erro, nome não pode conter espaços. Por favor, insira um nome válido.");
      return;
    }
    const nameExists = await checkNameAvailability(nameDisplay);
    if (nameExists) {
      toast.error("Erro, nome não está disponível. Por favor, escolha outro.");
      return;
    }
    await updateDoc(doc(storeApp, "users", uid), {
      name: nameDisplay,
    });
    toast.success("Nome atualizado!");

    setDataBase(prevData => ({ ...prevData, name: nameDisplay }));
  };

  const handleUpdatePhoto = async (event) => {
    event.preventDefault();
    if (photoFile) {
      const userEmail = auth.currentUser.email;
      const oldPhotoRef = ref(storage, `images/${userEmail}/profile.jpg`);
      try {
        await deleteObject(oldPhotoRef);
        console.log("Foto antiga excluída com sucesso.");
      } catch (error) {
        console.log("Erro ao excluir a foto antiga:", error);
      }
      const storageRef = ref(storage, `images/${userEmail}/profile.jpg`);
      await uploadBytes(storageRef, photoFile);
      const photoURL = await getDownloadURL(storageRef);
      await updateDoc(doc(storeApp, "users", uid), {
        photo: photoURL,
      });
      toast.success("Foto atualizada!");

      setDataBase(prevData => ({ ...prevData, photo: photoURL }));
    } else {
      toast.error("Erro, selecione uma foto!");
    }
  };

  const deletePhoto = async (event) => {
    event.preventDefault();
    const userEmail = auth.currentUser.email;
    const photoRef = ref(storage, `images/${userEmail}/profile.jpg`);
    try {
      await deleteObject(photoRef);
      console.log("Foto excluída com sucesso.");
      await updateDoc(doc(storeApp, "users", uid), {
        photo: deleteField(),
      });
      toast.success("Foto removida com sucesso!");

      setDataBase(prevData => ({ ...prevData, photo: null }));
    } catch (error) {
      console.error("Erro ao remover a foto:", error);
      toast.error("Erro ao remover a foto. Tente novamente.");
    }
  };

  if (dataBase.name === null) {
    return <Navigate to='/welcome'></Navigate>;
  }

  return (
    <View>
      <NavBoard />
      <BlockView>
        <Block>
          <div>
            <h2>Configurações</h2>
            <InputLogin type="text" id="name" defaultValue={dataBase.name} value={nameDisplay} placeholder="Nome de usuário" onChange={handleDisplayName} />
            <Button className="bi bi-textarea-t" onClick={handleUpdateName}> Aplicar</Button>
            {/* Input de foto estilizado */}
            <File>
              <FileInput type="file" accept="image/*" id="photo-upload" onChange={handlePhotoFileChange} />
              {/* Troca o texto do rótulo com base na seleção de foto */}
              <FileLabel htmlFor="photo-upload">
                {photoFile ? "Foto Selecionada!" : "Selecionar Foto"}
              </FileLabel>
            </File>
            <Button className="bi bi-image" onClick={handleUpdatePhoto}> Aplicar</Button>
            <Button onClick={deletePhoto}> Excluir Foto</Button>
          </div>
        </Block>
      </BlockView>
    </View>
  );
};
