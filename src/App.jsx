import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ConnectPage from './ConnectPage';
import DeletePage from './DeletePage';
import Conversation from './Conversation';
import Login from './Login';


function App() {

  return (
    <>
   <BrowserRouter>
       <Routes>
       <Route path='/' element={<Login/>}></Route>
        <Route path='/connect-page' element={<ConnectPage/>}/>
        <Route path='/delete-or-message' element={<DeletePage/>}/>
        <Route path='/conversation' element={<Conversation/>}/>
        

       </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
