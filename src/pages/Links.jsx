import { View, BlockView, Block } from "../components/View"

import { Navigate } from 'react-router-dom'

import { auth } from "../config/firebase"

import { NavBoard } from "../components/NavBoard";

export const Links = () => {

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
            <h2>Link</h2>
            <p>Bem-vindo de volta, {name}.</p>
          </div>
        </Block>
      </BlockView>
    </View>
  )
}