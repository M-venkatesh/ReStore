import Catalog from "../../features/Catalog/Catalog";
import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Header from "./Header";
import { useState } from "react";



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
        <Catalog />
      </Container>
    </ThemeProvider>
  );
}

export default App;
