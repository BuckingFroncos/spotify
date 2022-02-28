import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" component={Home}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
