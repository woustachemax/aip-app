import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import  { Signup } from './pages/Singnup';
import { Login } from './pages/Login';
import { Functionality } from './pages/Functionality';


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path='/signup' element={ <Signup/> }/>
            <Route path='login' element={<Login/>}/>
            <Route path='/functionality' element={<Functionality/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
