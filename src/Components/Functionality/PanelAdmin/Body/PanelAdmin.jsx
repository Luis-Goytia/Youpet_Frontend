import React from "react";
import { Route, Routes } from "react-router-dom"
import { ColorModeContext, useMode } from "../theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import "./PanelAdmin.css";
// import TopBar from "../TopBar/index.jsx";
import SideBar from "../SideBar/index.jsx";
import Dashboard from "../Dashboard/index.jsx";
import Users from "../Users/index.jsx";
import Contacts from "../Contacts";
import VetInformation from "../VetInformation";
import CalendarAdmin from "../Calendar";
import AdminRegister from "../AdminRegister";
import VetForm from "../../Forms/Vet";
import ServiceRegister from "../AllServices/ServiceRegister";
import ServicesInfo from "../AllServices/ServicesInfo";

export default function PanelAdmin() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <SideBar/>
          <main className="content">
            {/* <TopBar /> */}
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/users" element={<Users />} />
              <Route path="/contacts" element={<Contacts/>} />
              <Route path="/allvets" element={<VetInformation/>}/>
              <Route path="/services" element={<ServicesInfo/>} />
              <Route path="/adminregister" element={<AdminRegister/>} />
              <Route path="/vetregister" element={<VetForm/>}/>
              <Route path="/servregister" element={<ServiceRegister/>} />
              <Route path="/calendar" element={<CalendarAdmin/>} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
