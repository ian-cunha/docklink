import styled from 'styled-components';
import { View, BlockView, Block } from "../components/View";
import { Navigate } from 'react-router-dom';
import { NavBoard } from "../components/NavBoard";
import { Structure } from "../components/Structure";
import { auth, storeApp } from "../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '../components/Button';

const Title = styled.h2`
  font-size: 2em;
  margin-bottom: 20px;
`;

const Label = styled.label`
  margin-right: 10px;
  font-weight: bold;
`;

const ColorInputContainer = styled.div`
  margin: 10px 0;
  display: flex;
  align-items: center;
`;

const ColorInput = styled.input`
  margin-left: 10px;
  width: 100px;
  height: 40px;
  border: none;
  border-radius: 4px;
`;

export const BlockAppearance = styled.div`
  animation: bounceInDown;
  animation-duration: 1s;
  margin: 110px 50px;
  padding: 24px;
  border-radius: 20px;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  color: white;
  
  @media (max-width: 768px) {
    margin: 24px;
  }
`;

export const Appearance = () => {
  const user = auth.currentUser;
  const uid = user.uid;

  const [dataBase, setDataBase] = useState({});
  const [backgroundColor, setBackgroundColor] = useState('black');
  const [buttonColor, setButtonColor] = useState('#535BF2');
  const [buttonShadowColor, setButtonShadowColor] = useState('#141740');
  const [textColor, setTextColor] = useState('white');
  const [titleColor, setTitleColor] = useState('white');
  const [subTitleColor, setSubTitleColor] = useState('white');

  const getDataBase = async () => {
    const docRef = doc(storeApp, "users", uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      setDataBase(data);

      if (data.backgroundColor) setBackgroundColor(data.backgroundColor);
      if (data.buttonColor) setButtonColor(data.buttonColor);
      if (data.buttonShadowColor) setButtonShadowColor(data.buttonShadowColor);
      if (data.textColor) setTextColor(data.textColor);
      if (data.titleColor) setTitleColor(data.titleColor);
      if (data.subTitleColor) setSubTitleColor(data.subTitleColor);
    } else {
      console.log("Sem dados!");
    }
  };

  useEffect(() => {
    getDataBase();
  }, []);

  const saveAppearanceSettings = async () => {
    const docRef = doc(storeApp, "users", uid);
    await updateDoc(docRef, {
      backgroundColor: backgroundColor,
      buttonColor: buttonColor,
      buttonShadowColor: buttonShadowColor,
      textColor: textColor,
      titleColor: titleColor,
      subTitleColor: subTitleColor,
    });
    toast.success("Preferências de aparência salvas!");
  };

  if (dataBase.name === null) {
    return <Navigate to='/welcome' />;
  }

  return (
    <View>
      <NavBoard />
      <BlockView>
        <BlockAppearance>
          <Title>Aparência</Title>
          
          <ColorInputContainer>
            <Label>Cor do Título:</Label>
            <ColorInput type="color" value={titleColor} onChange={(e) => setTitleColor(e.target.value)} />
          </ColorInputContainer>
          
          <ColorInputContainer>
            <Label>Cor do Subtítulo:</Label>
            <ColorInput type="color" value={subTitleColor} onChange={(e) => setSubTitleColor(e.target.value)} />
          </ColorInputContainer>
          
          <ColorInputContainer>
            <Label>Cor de Fundo:</Label>
            <ColorInput type="color" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} />
          </ColorInputContainer>
          
          <ColorInputContainer>
            <Label>Cor dos Botões:</Label>
            <ColorInput type="color" value={buttonColor} onChange={(e) => setButtonColor(e.target.value)} />
          </ColorInputContainer>
          
          <ColorInputContainer>
            <Label>Cor da Sombra dos Botões:</Label>
            <ColorInput type="color" value={buttonShadowColor} onChange={(e) => setButtonShadowColor(e.target.value)} />
          </ColorInputContainer>
          
          <ColorInputContainer>
            <Label>Cor do Texto:</Label>
            <ColorInput type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} />
          </ColorInputContainer>
          
          <Button onClick={saveAppearanceSettings}>Salvar Aparência</Button>
        </BlockAppearance>
        
        <Block>
          <Structure />
        </Block>
      </BlockView>
    </View>
  );
};
