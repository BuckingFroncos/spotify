import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'

import Home from './pages/Home'
import PlaylistCreate from './pages/MusicSearch';

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/Search" element={<PlaylistCreate />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
