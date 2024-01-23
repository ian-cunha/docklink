import { Button } from "../components/Button"
import { View, BlockView, Block } from "../components/View"

import { Navigate } from 'react-router-dom'

import { signOut } from "firebase/auth"
import { auth } from "../config/firebase"

import { NavBoard } from "../components/NavBoard";

export const Links = () => {

  const handleSignOut = () => {
    signOut(auth)
      .then(() => console.log('Sign Out'))
      .catch((error) => console.log(error))
  }

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
          <h2>Link</h2>
          <p>Bem-vindo de volta, {name}.</p>
          <Button onClick={handleSignOut}>Sair</Button>
        </Block>
      </BlockView>
    </View>
  )
}