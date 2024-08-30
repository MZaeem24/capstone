import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/navbar';
import Home from './pages/home';
import Vouchers from './pages/vouchers';
import Admin from './pages/admin';
import Signup from './components/signupform';


function App() {
  return (
    
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vouchers" element={<Vouchers />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/register" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
