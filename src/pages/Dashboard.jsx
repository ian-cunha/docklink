import { View, BlockView, Block } from "../components/View"

import { Navigate } from 'react-router-dom'

import { auth } from "../config/firebase"

import { Structure } from "../components/Structure"
import { NavBoard } from "../components/NavBoard";

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
          <h2>Informação será aqui</h2>
        </Block>
        <Block>
          <Structure />
        </Block>
      </BlockView>
    </View>
  )
}