import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Create from './pages/Create'
import Layout from './components/Layout';
import { createTheme, ThemeProvider } from '@mui/material';
import { purple } from '@mui/material/colors';
import DisplayResults from './pages/Search-Results';
import Login from './pages/Login';

const theme = createTheme({
  palette:{
    primary:{
      main: '#fefefe'
    },
    secondary: purple
  }
})

function App() {
  return(
    <ThemeProvider theme={theme}>
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
