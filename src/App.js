
import './App.css';
import { Home } from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import React,{useState} from 'react';
function App() {
  const [alert,setAlert]=useState(null);
  const showAlert=(message,type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
      setAlert(null)
    },2000)
  }
  return (
    <div>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <Alert alert={alert}/>
          {/* <Login/>
          <Signup/> */}
          <div className="container">
            <Routes>
              <Route path="/Home" element={<Home  showAlert={showAlert}/>} />
              <Route path="/About" element={<About />} />
              <Route path="/login" element={<Login showAlert={showAlert}/>}/>
              <Route path="/signup" element={<Signup showAlert={showAlert}/>}/>

            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>


    </div>

  );
}

export default App;
