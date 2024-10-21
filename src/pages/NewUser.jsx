/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "../components/Button";
import { ViewNew } from "../components/View";
import { auth, storeApp } from "../config/firebase";
import { doc, setDoc, getDoc, query, where, getDocs, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import { TextH2, TextH4 } from "../components/Text";
import { InputLogin } from "../components/Form";

export const NewUser = () => {
  const [nameDisplay, setNameDisplay] = useState('');
  const handleNameDisplay = (event) => setNameDisplay(event.target.value.trim());

  const user = auth.currentUser;
  const uid = user.uid;
  const email = user.email;

  const [dataBase, setDataBase] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const getDataBase = async () => {
    const docRef = doc(storeApp, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setDataBase(docSnap.data());
      console.log(docSnap.data());
    } else {
      console.log("Sem dados!");
    }
  };

  const checkNameAvailability = async (name) => {
    const usersRef = collection(storeApp, "users");
    const q = query(usersRef, where("name", "==", name));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };

  const newUser = async (event) => {
    event.preventDefault();

    if (nameDisplay.includes(' ')) {
      setMessage("Erro, nome não pode conter espaços. Por favor, insira um nome válido.");
      setTimeout(() => setMessage(''), 2000);
      return;
    }

    const nameExists = await checkNameAvailability(nameDisplay);
    if (nameExists) {
      setMessage("Erro, nome não está disponível. Por favor, escolha outro.");
      setTimeout(() => setMessage(''), 2000);
      return;
    }

    await setDoc(doc(storeApp, "users", uid), {
      started: new Date(),
      name: nameDisplay,
      email: email,
    });

    navigate('/dashboard');
  };

  useEffect(() => {
    getDataBase();
  }, []);

  if (dataBase && dataBase.name) {
    return <Navigate to='/dashboard'></Navigate>;
  }

  return (
    <ViewNew>
      <TextH2>Bem-vindo ao Docklink.</TextH2>
      <TextH4>Agora só falta você criar seu usuário para começar...</TextH4>
      {message && <p>{message}</p>}
      <InputLogin type="text" placeholder="Nome de usuário" onChange={handleNameDisplay} />
      <Button onClick={newUser}>Confirmar</Button>
    </ViewNew>
  );
};
