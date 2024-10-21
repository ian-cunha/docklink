/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import { auth, storeApp } from "../config/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, PhoneStyle, ViewStructure, ImageLinking, Title, SubTitle, Blocks } from "./Phone";

export const Structure = () => {
  const user = auth.currentUser;
  const uid = user.uid;

  const [dataBase, setDataBase] = useState({});
  const [links, setLinks] = useState([]);

  const [backgroundColor, setBackgroundColor] = useState('black');
  const [textColor, setTextColor] = useState('#FFFFFF');
  const [buttonColor, setButtonColor] = useState('#535BF2');
  const [buttonShadowColor, setButtonShadowColor] = useState('#141740');
  const [titleColor, setTitleColor] = useState('#FFFFFF');
  const [subTitleColor, setSubTitleColor] = useState('#FFFFFF');

  const getDataBase = () => {
    const docRef = doc(storeApp, "users", uid);

    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setDataBase(data);
        setLinks(data.links || []);

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

    return () => unsubscribe();
  };

  useEffect(() => {
    getDataBase();
  }, []);

  const structureStyle = {
    backgroundColor: backgroundColor,
    color: textColor,
  };

  return (
    <ViewStructure>
      <PhoneStyle style={structureStyle}>
        {dataBase.photo && <ImageLinking src={dataBase.photo} />}

        <Title style={{ color: titleColor }}>@{dataBase.name}</Title>
        <SubTitle style={{ color: subTitleColor }}>{dataBase.email}</SubTitle>

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
