import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Cities from "./pages/Cities.jsx";
import Tours from "./pages/Tours.jsx";
import Login from "./pages/Login.jsx";
import Tour from "./pages/Tour.jsx";
import City from "./pages/City.jsx";
import Booking from "./pages/Booking.jsx";
import BookingSuccess from "./pages/BookingSuccess.jsx";

import AdminMainPage from "./admin/AdminMainPage.jsx";
import AdminBookings from './admin/AdminBookings.jsx';
import AdminCities from './admin/AdminCities.jsx';
import AdminTours from './admin/AdminTours.jsx';

import Navigation from "./components/Navigation.jsx";
import './App.css'
import Registration from './pages/Registration.jsx';

function App() {

  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/cities" element={<Cities />}/>
        <Route path="/tours" element={<Tours />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/registration" element={<Registration />}/>
        <Route path="/tours/:id" element={<Tour />} />
        <Route path="/cities/:id" element={<City />}/>
        <Route path="/booking/:id" element={<Booking />} />
        <Route path="/booking/success" element={<BookingSuccess />} />

        <Route path="/admin" element={<AdminMainPage />}/>
        <Route path="/admin/bookings" element={<AdminBookings />}/>
        <Route path="/admin/cities" element={<AdminCities />}/>
        <Route path="/admin/tours" element={<AdminTours />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
