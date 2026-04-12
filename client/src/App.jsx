import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Countries from "./pages/Countries";
import Tours from "./pages/Tours";
import Login from "./pages/Login";

import Nav from "./components/Nav";
import './App.css'

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
      </Routes>
    </BrowserRouter>
  )
}

export default App
