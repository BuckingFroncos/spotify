import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Create from './pages/Create'
import Layout from './components/Layout';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import DisplayResults from './pages/Search-Results';
import Login from './pages/Login';

const theme = createTheme({
  palette:{
    mode: "dark",
    primary:{
      main: '#424242'
    },
    secondary: {
      main: '#b39ddb'
    }
  },
  typography: {
    fontFamily: 'Quicksand',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  }
})

function App() {
  return(
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <BrowserRouter>
      <Layout>
          <Routes>
            <Route path="/" element={<Login/>}/> 
            <Route path="/home" element={<Home/>}/>
            <Route path="/create" element={<Create/>}/>
            <Route path="/create/:name/:uri" element={<DisplayResults/>}/>
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
