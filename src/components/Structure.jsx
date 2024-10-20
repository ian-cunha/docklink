/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import { auth, storeApp } from "../config/firebase";
import { doc, onSnapshot } from "firebase/firestore"; // Importando onSnapshot para ouvir atualizações em tempo real
import { useEffect, useState } from "react";
import { Link, PhoneStyle, ViewStructure, ImageLinking, Title, SubTitle, Blocks } from "./Phone";

export const Structure = () => {
  const user = auth.currentUser;
  const uid = user.uid;

  const [dataBase, setDataBase] = useState({}); // Estado para dados gerais do usuário
  const [links, setLinks] = useState([]); // Estado para os links
  // Novos estados para as cores e aparências
  const [backgroundColor, setBackgroundColor] = useState('black'); // Cor padrão do fundo
  const [textColor, setTextColor] = useState('#FFFFFF'); // Cor padrão do texto
  const [buttonColor, setButtonColor] = useState('#535BF2'); // Cor padrão do botão
  const [buttonShadowColor, setButtonShadowColor] = useState('#141740'); // Cor padrão da sombra do botão
  const [titleColor, setTitleColor] = useState('#FFFFFF'); // Cor padrão do título
  const [subTitleColor, setSubTitleColor] = useState('#FFFFFF'); // Cor padrão do subtítulo

  // Função para ouvir as atualizações do Firestore em tempo real
  const getDataBase = () => {
    const docRef = doc(storeApp, "users", uid);

    // Ouvinte em tempo real para o documento do usuário
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setDataBase(data);
        setLinks(data.links || []); // Atualiza os links em tempo real

        // Aplicando as preferências de cores salvas do Firestore
        if (data.backgroundColor) setBackgroundColor(data.backgroundColor);
        if (data.textColor) setTextColor(data.textColor);
        if (data.buttonColor) setButtonColor(data.buttonColor);
        if (data.buttonShadowColor) setButtonShadowColor(data.buttonShadowColor);
        if (data.titleColor) setTitleColor(data.titleColor);
        if (data.subTitleColor) setSubTitleColor(data.subTitleColor);

        console.log("Dados atualizados:", data);
      } else {
        console.log("Sem dados!");
      }
    });

    // Limpa o ouvinte quando o componente é desmontado
    return () => unsubscribe();
  };

  useEffect(() => {
    getDataBase();
  }, []);

  // Aplicar a cor de fundo ao estilo da estrutura
  const structureStyle = {
    backgroundColor: backgroundColor,
    color: textColor,
  };

  return (
    <ViewStructure>
      <PhoneStyle style={structureStyle}>
        {/* Exibe a imagem se houver */}
        {dataBase.photo && <ImageLinking src={dataBase.photo} />}

        {/* Exibe o nome e email do usuário com as cores definidas */}
        <Title style={{ color: titleColor }}>@{dataBase.name}</Title>
        <SubTitle style={{ color: subTitleColor }}>{dataBase.email}</SubTitle>

        {/* Mapeia os links armazenados no array */}
        {links.map((link, index) => (
          link.title && link.url && (
            <Blocks key={index}>
              <Link href={link.url} style={{ backgroundColor: buttonColor, color: textColor, boxShadow: `3px 6px ${buttonShadowColor}` }}>
                {link.title}
              </Link>
            </Blocks>
          )
        ))}
      </PhoneStyle>
    </ViewStructure>
  );
};
