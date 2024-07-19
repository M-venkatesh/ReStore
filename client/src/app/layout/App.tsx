import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Header from "./Header";
import React, { useState } from 'react';
import Catalog from "../../features/Catalog/Catalog";
import { Outlet } from "react-router-dom";
export const ApiContext = React.createContext({});
function App() {
  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark': 'light';
  const theme = createTheme({
    palette:{
      mode:paletteType
    }
  })
  
  function handleThemeChange(){
    setDarkMode(!darkMode);
  }
  

  return (
    <ThemeProvider theme={theme}>
      {/* <Typography variant="h2" style={{textAlign:"center",color:"darkblue"}}>Home Page</Typography> */}
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange}/>
      <Container>
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}

export default App;
