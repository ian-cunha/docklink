/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useNavigate, useParams } from 'react-router-dom';
import { storeApp } from "../config/firebase";
import { doc, getDoc, query, where, getDocs, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ImageLinking, Title, SubTitle } from "../components/Phone";
import { ViewStructure, View, BlockBtn, LinkBtn, Logo, LogoContainer, TextLogo } from "../components/Link";
import logo from '../assets/logo.svg';

export const Share = () => {
  let { nameDisplay } = useParams(); // Pegando o nome pelo parâmetro
  const navigate = useNavigate();

  const [dataBase, setDataBase] = useState({});
  const [backgroundColor, setBackgroundColor] = useState('black'); // Cor padrão do fundo
  const [buttonColor, setButtonColor] = useState('#535BF2'); // Cor padrão do botão
  const [buttonShadowColor, setButtonShadowColor] = useState('#141740'); // Cor padrão da sombra do botão
  const [textColor, setTextColor] = useState('white'); // Cor padrão do texto

  // Novos estados para as cores do título e subtítulo
  const [titleColor, setTitleColor] = useState('white'); // Cor padrão do título
  const [subTitleColor, setSubTitleColor] = useState('white'); // Cor padrão do subtítulo

  const getDataBase = async () => {
    const usersRef = collection(storeApp, "users");
    const q = query(usersRef, where("name", "==", nameDisplay)); // Busca pelo nome

    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        setDataBase(userData);

        // Se existirem, aplicamos as preferências de cores salvas do Firestore
        if (userData.backgroundColor) setBackgroundColor(userData.backgroundColor);
        if (userData.buttonColor) setButtonColor(userData.buttonColor);
        if (userData.buttonShadowColor) setButtonShadowColor(userData.buttonShadowColor);
        if (userData.textColor) setTextColor(userData.textColor);
        if (userData.titleColor) setTitleColor(userData.titleColor); // Carrega a cor do título
        if (userData.subTitleColor) setSubTitleColor(userData.subTitleColor); // Carrega a cor do subtítulo
        console.log(userData);
      });
    } else {
      console.log("Sem dados!");
    }
  };

  // Atualiza o título da página com o nome do usuário
  document.title = dataBase.name || "Docklink";

  useEffect(() => {
    getDataBase();
  }, [nameDisplay]); // Dependência do nameDisplay para recarregar ao mudar

  // Aplicar as cores dinamicamente ao estilo da página
  const viewStyle = {
    backgroundColor: backgroundColor,
    color: textColor,
  };

  const buttonStyle = {
    backgroundColor: buttonColor,
    color: textColor,
    boxShadow: `3px 6px ${buttonShadowColor}`, // Aplicando a sombra com a cor escolhida
    borderWidth: '2px', // Ajuste a largura da borda conforme necessário
    borderStyle: 'solid', // Define o estilo da borda
    borderColor: buttonColor, // A cor da borda pode ser a mesma do botão, se desejado
  };

  return (
    <View style={viewStyle}>
      {dataBase.name && (
        <ViewStructure>
          {dataBase.photo && (
            <ImageLinking src={dataBase.photo} alt={`Foto de ${dataBase.name}`} />
          )}
          {/* Aplicando a cor do título */}
          <Title style={{ color: titleColor }}>@{dataBase.name}</Title>
          {/* Aplicando a cor do subtítulo */}
          <SubTitle style={{ color: subTitleColor }}>{dataBase.email}</SubTitle>

          {/* Verifica se há links e renderiza dinamicamente */}
          {dataBase.links && dataBase.links.length > 0 && (
            dataBase.links.map((link, index) => (
              <BlockBtn key={index}>
                <LinkBtn href={link.url} style={buttonStyle}>{link.title}</LinkBtn>
              </BlockBtn>
            ))
          )}
        </ViewStructure>
      )}

      <LogoContainer onClick={() => navigate('/')}>
        <Logo src={logo} alt="Logo Docklink" />
        <TextLogo>Docklink</TextLogo>
      </LogoContainer>
    </View>
  );
};
