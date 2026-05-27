import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Cities from "./pages/Cities.jsx";
import Tours from "./pages/Tours.jsx";
import Login from "./pages/Login.jsx";
import Tour from "./pages/Tour.jsx";
import City from "./pages/City.jsx";

import AdminMainPage from "./admin/AdminMainPage.jsx";

import Nav from "./components/Navigation.jsx";
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
        <Route path="/cities" element={<Cities />}/>
        <Route path="/tours" element={<Tours />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/registration" element={<Registration />}/>
        <Route path="/tours/:id" element={<Tour />} />
        <Route path="/cities/:id" element={<City />}/>

        <Route path="/admin" element={<AdminMainPage />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
