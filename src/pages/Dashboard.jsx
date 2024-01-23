import { View, BlockView, Block, Items, ViewBox } from "../components/View"

import { Navigate } from 'react-router-dom'

import { auth } from "../config/firebase"

import { Structure } from "../components/Structure"
import { NavBoard } from "../components/NavBoard";
import { InputBox, InputView } from "../components/Form";
import { ButtonBox } from "../components/Button";

export const Dashboard = () => {

  const user = auth.currentUser;
  const name = user.displayName;

  if (name === null) {
    return <Navigate to='/welcome'></Navigate>
  }

  return (
    <View>
      <NavBoard />
      <BlockView>
        <Block>
          <Items>
            <ViewBox>
              <InputView>
                <i className="bi bi-pen"></i>
                <InputBox placeholder="Título" />
              </InputView>
              <InputView>
                <i className="bi bi-pen"></i>
                <InputBox placeholder="URL" />
              </InputView>
            </ViewBox>
            <ViewBox>
              <ButtonBox className="bi bi-cloud-upload" />
            </ViewBox>
          </Items>
        </Block>
        <Block>
          <Structure />
        </Block>
      </BlockView>
    </View>
  )
}