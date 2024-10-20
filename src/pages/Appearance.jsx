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

// Styled Components
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
  const [backgroundColor, setBackgroundColor] = useState('black'); // Cor padrão do fundo
  const [buttonColor, setButtonColor] = useState('#535BF2'); // Cor padrão do botão
  const [buttonShadowColor, setButtonShadowColor] = useState('#141740'); // Cor padrão da sombra do botão
  const [textColor, setTextColor] = useState('white'); // Cor padrão do texto
  const [titleColor, setTitleColor] = useState('white'); // Cor padrão do título
  const [subTitleColor, setSubTitleColor] = useState('white'); // Cor padrão do subtítulo

  // Função para buscar dados do usuário no Firestore
  const getDataBase = async () => {
    const docRef = doc(storeApp, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      setDataBase(data);

      // Aplicando valores salvos no Firestore, se existirem
      if (data.backgroundColor) setBackgroundColor(data.backgroundColor);
      if (data.buttonColor) setButtonColor(data.buttonColor);
      if (data.buttonShadowColor) setButtonShadowColor(data.buttonShadowColor);
      if (data.textColor) setTextColor(data.textColor);
      if (data.titleColor) setTitleColor(data.titleColor); // Preencher com a cor do título
      if (data.subTitleColor) setSubTitleColor(data.subTitleColor); // Preencher com a cor do subtítulo
    } else {
      console.log("Sem dados!");
    }
  };

  useEffect(() => {
    getDataBase();
  }, []);

  // Função para salvar todas as preferências de aparência no Firestore
  const saveAppearanceSettings = async () => {
    const docRef = doc(storeApp, "users", uid);
    await updateDoc(docRef, {
      backgroundColor: backgroundColor,
      buttonColor: buttonColor,
      buttonShadowColor: buttonShadowColor,
      textColor: textColor,
      titleColor: titleColor, // Salvar a cor do título
      subTitleColor: subTitleColor, // Salvar a cor do subtítulo
    });
    toast.success("Preferências de aparência salvas!"); // Notificação de sucesso
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

          {/* Seletor de cor do título */}
          <ColorInputContainer>
            <Label>Cor do Título:</Label>
            <ColorInput
              type="color"
              value={titleColor}
              onChange={(e) => setTitleColor(e.target.value)}
            />
          </ColorInputContainer>

          {/* Seletor de cor do subtítulo */}
          <ColorInputContainer>
            <Label>Cor do Subtítulo:</Label>
            <ColorInput
              type="color"
              value={subTitleColor}
              onChange={(e) => setSubTitleColor(e.target.value)}
            />
          </ColorInputContainer>

          {/* Seletor de cor de fundo */}
          <ColorInputContainer>
            <Label>Cor de Fundo:</Label>
            <ColorInput
              type="color"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
            />
          </ColorInputContainer>

          {/* Seletor de cor de botão */}
          <ColorInputContainer>
            <Label>Cor dos Botões:</Label>
            <ColorInput
              type="color"
              value={buttonColor}
              onChange={(e) => setButtonColor(e.target.value)}
            />
          </ColorInputContainer>

          {/* Seletor de cor da sombra do botão */}
          <ColorInputContainer>
            <Label>Cor da Sombra dos Botões:</Label>
            <ColorInput
              type="color"
              value={buttonShadowColor}
              onChange={(e) => setButtonShadowColor(e.target.value)}
            />
          </ColorInputContainer>

          {/* Seletor de cor do texto */}
          <ColorInputContainer>
            <Label>Cor do Texto:</Label>
            <ColorInput
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
            />
          </ColorInputContainer>

          {/* Botão para salvar as configurações */}
          <Button onClick={saveAppearanceSettings}>Salvar Aparência</Button>
        </BlockAppearance>

        {/* Exibição da estrutura com as novas cores aplicadas */}
        <Block>
          <Structure />
        </Block>
      </BlockView>

      {/* Contêiner para exibir notificações */}
      <ToastContainer />
    </View>
  );
};
