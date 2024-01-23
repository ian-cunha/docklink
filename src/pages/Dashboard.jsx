import { View, BlockView, Block, Items } from "../components/View"

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
          <Items>
            <h2>Link 1</h2>
          </Items>
          <Items>
            <h2>Link 2</h2>
          </Items>
          <Items>
            <h2>Link 3</h2>
          </Items>
          <Items>
            <h2>Link 4</h2>
          </Items>
          <Items>
            <h2>Link 5</h2>
          </Items>
        </Block>
        <Block>
          <Structure />
        </Block>
      </BlockView>
    </View>
  )
}