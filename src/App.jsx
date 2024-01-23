import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useEffect, useState } from "react"

import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./config/firebase"

import { ProtectedRoute } from "./config/protectedRoute"
import { Home } from "./pages/Home";
import { Dashboard } from "./pages/Dashboard"
import { LoginRegister } from "./pages/LoginRegister"
import { Settings } from "./pages/Settings"
import { Links } from "./pages/Links"

import GlobalStyle from './globalStyles';
import { NewUser } from "./pages/NewUser"
import { ViewNew } from "./components/View"
import { TextH2 } from "./components/Text"

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
    return <ViewNew>
      <TextH2>Carregando...</TextH2>
    </ViewNew>;
  }

  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route index path="/login" element={<LoginRegister user={user} />} />
        <Route index path="/dashboard" element={
          <ProtectedRoute user={user}>
            <Dashboard />
          </ProtectedRoute>} />
        <Route index path="/settings" element={
          <ProtectedRoute user={user}>
            <Settings />
          </ProtectedRoute>} />
          <Route index path="/link" element={
          <ProtectedRoute user={user}>
            <Links />
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