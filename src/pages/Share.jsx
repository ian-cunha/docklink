import { useNavigate, useParams } from 'react-router-dom';
import { storeApp } from "../config/firebase";
import { doc, getDoc, query, where, getDocs, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ImageLinking, Title, SubTitle } from "../components/Phone";
import { ViewStructure, View, BlockBtn, LinkBtn, Logo, LogoContainer, TextLogo } from "../components/Link";
import logo from '../assets/logo.svg';

export const Share = () => {
  let { nameDisplay } = useParams();
  const navigate = useNavigate();

  const [dataBase, setDataBase] = useState({});
  const [backgroundColor, setBackgroundColor] = useState('black');
  const [buttonColor, setButtonColor] = useState('#535BF2');
  const [buttonShadowColor, setButtonShadowColor] = useState('#141740');
  const [textColor, setTextColor] = useState('white');
  const [titleColor, setTitleColor] = useState('white');
  const [subTitleColor, setSubTitleColor] = useState('white');

  const getDataBase = async () => {
    const usersRef = collection(storeApp, "users");
    const q = query(usersRef, where("name", "==", nameDisplay));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        setDataBase(userData);

        if (userData.backgroundColor) setBackgroundColor(userData.backgroundColor);
        if (userData.buttonColor) setButtonColor(userData.buttonColor);
        if (userData.buttonShadowColor) setButtonShadowColor(userData.buttonShadowColor);
        if (userData.textColor) setTextColor(userData.textColor);
        if (userData.titleColor) setTitleColor(userData.titleColor);
        if (userData.subTitleColor) setSubTitleColor(userData.subTitleColor);
        console.log(userData);
      });
    } else {
      console.log("Sem dados!");
    }
  };

  document.title = dataBase.name || "Docklink";

  useEffect(() => {
    getDataBase();
  }, [nameDisplay]);

  const viewStyle = {
    backgroundColor: backgroundColor,
    color: textColor,
  };

  const buttonStyle = {
    backgroundColor: buttonColor,
    color: textColor,
    boxShadow: `3px 6px ${buttonShadowColor}`,
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: buttonColor,
  };

  return (
    <View style={viewStyle}>
      {dataBase.name && (
        <ViewStructure>
          {dataBase.photo && (
            <ImageLinking src={dataBase.photo} alt={`Foto de ${dataBase.name}`} />
          )}
          <Title style={{ color: titleColor }}>@{dataBase.name}</Title>
          <SubTitle style={{ color: subTitleColor }}>{dataBase.email}</SubTitle>

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
