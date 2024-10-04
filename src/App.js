import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import Liste from "./scenes/listeResto";
import ListeLivreur from "./scenes/listeLivreur";
import ProfilResto from "./scenes/ProfilResto/ProfilResto";
import Login from "./components/Login/Login";
import PageResto from "./scenes/PageResto/index";
import Profile from "./scenes/profile/Profile";
import ResetPassword from "./scenes/resetPassword/ResetPassword";
import MenuPage from "./scenes/MenuPage/MenuPage";
import { UserProvider } from './context/UserContext';
import Suivre from "./scenes/SuivreCde/Suivre";
import ForgotPassword from "./scenes/resetPassword/ForgotPassword";
import { createRoot } from 'react-dom';


function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const accessToken= localStorage.getItem('accessToken')
  // console.log(accessToken)

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <UserProvider>
          {accessToken ? (
            <div className="app">
              <Sidebar isSidebar={isSidebar} />
              <main className="content">
                <Topbar setIsSidebar={setIsSidebar} />
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/team" element={<Team />} />
                  <Route path="/contacts" element={<Contacts />} />
                  <Route path="/listeResto" element={<Liste />} />
                  <Route path="/listeLivreur" element={<ListeLivreur />} />
                  <Route path="/form" element={<Form />} />
                  <Route path="/bar" element={<Bar />} />
                  <Route path="/PageResto" element={<PageResto />} />
                  <Route path="/pie" element={<Pie />} />
                  <Route path="/line" element={<Line />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/calendar" element={<Calendar />} />
                <Route path="/geography" element={<Geography />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/MenuPage" element={<MenuPage/>}/>
                <Route path="/ProfilResto" element={<ProfilResto />} />
                <Route path="/SuivreCde" element={<Suivre />} />
                

                <Route path="/*" element={<Navigate to="/" />} />
                </Routes>
              </main>
            </div>
          ) : (
            <>
              <Routes>
              
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />
                <Route path="/*" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
              </Routes>
            </>
          )}
        </UserProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;