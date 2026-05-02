import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Countries from "./pages/Countries.jsx";
import Tours from "./pages/Tours.jsx";
import Login from "./pages/Login.jsx";

import Nav from "./components/Nav.jsx";
import './App.css'
import Registration from './pages/Registration.jsx';

function App() {
  // const [count, setCount] = useState(0)
  // useEffect(() => {
  // fetch('/api/test')
  //   .then(res => res.json())
  //   .then(data => console.log(data));
  // }, []); 

  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/countries" element={<Countries />}/>
        <Route path="/tours" element={<Tours />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/registration" element={<Registration />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
