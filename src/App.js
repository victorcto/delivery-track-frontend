import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Topbar from './pages/global/Topbar'
import Sidebar from "./pages/global/Sidebar"
import Dashboard from "./pages/dashboard"
import FormCliente from "./pages/forms/FormCliente"
import FormMotorista from "./pages/forms/FormMotorista"
import FormEncomenda from "./pages/forms/FormEncomenda"
// import FormCliente from "./pages/formCliente"
// import FormMotorista from "./pages/formMotorista"
// import Cronograma from "./pages/cronograma"
// import Historico from "./pages/historico"
// import Relatorios from "./pages/relatorios"

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <div className="app" style={{height:"auto", minHeight: "100vh"}}>
          <Sidebar/>
          <main className="content">
            <Topbar/>
            <Routes>
              <Route path="/" element={<Dashboard/>}/>
              <Route path="/formCliente" element={<FormCliente />}/>
              <Route path="/formMotorista" element={<FormMotorista/>}/>
              <Route path="/formEncomenda" element={<FormEncomenda/>}/>
              {/* <Route path="/cronograma" element={<Cronograma/>}/> */}
              {/* <Route path="/historico" element={<Historico/>}/> */}
              {/* <Route path="/relatorios" element={<Relatorios/>}/> */}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
