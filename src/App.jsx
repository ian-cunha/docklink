import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useEffect, useState } from "react"

import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./config/firebase"

import { ProtectedRoute } from "./config/protectedRoute"
import { Home } from "./pages/Home";
import { Dashboard } from "./pages/Dashboard"
import { LoginRegister } from "./pages/LoginRegister"
import { Settings } from "./pages/Settings"
import { Appearance } from "./pages/Appearance"
import { ViewLoading } from "./components/View"

import GlobalStyle from './globalStyles';
import { NewUser } from "./pages/NewUser"
import { Share } from "./pages/Share"

function App() {
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsFetching(false);
        return;
      }

      setUser(null);
      setIsFetching(false);
    });
    return () => unsubscribe();
  }, []);

  if (isFetching) {
    return <ViewLoading>Carregando...</ViewLoading>;
  }

  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route index path="/:uid" element={<Share />} />
        <Route index path="/login" element={<LoginRegister user={user} />} />
        <Route index path="/dashboard" element={
          <ProtectedRoute user={user}>
            <Dashboard />
          </ProtectedRoute>} />
        <Route index path="/settings" element={
          <ProtectedRoute user={user}>
            <Settings />
          </ProtectedRoute>} />
        <Route index path="/appearance" element={
          <ProtectedRoute user={user}>
            <Appearance />
          </ProtectedRoute>} />
        <Route index path="/welcome" element={
          <ProtectedRoute user={user}>
            <NewUser />
          </ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
