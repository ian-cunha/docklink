import { View, BlockView, Block } from "../components/View"

import { Navigate } from 'react-router-dom'

import { auth } from "../config/firebase"

import { NavBoard } from "../components/NavBoard";

import { Structure } from "../components/Structure"

export const Appearance = () => {

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
          <div>
            <h2>Aparência</h2>
          </div>
        </Block>
        <Block>
          <Structure />
        </Block>
      </BlockView>
    </View>
  )
}