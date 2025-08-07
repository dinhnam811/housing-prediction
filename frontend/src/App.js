// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Container} from '@mui/material';

import Header from './components/Header';
import Home from './Pages/Home'; // New Home page
import Liveable from './Pages/Liveable'; // New Liveable page
import MaximumPrice from './Pages/MaximumPrice'; // New MaximumPrice page
import "./App.css";
import SuburbModel from './Pages/SuburbModel'; // New SuburbModel page

function App() {
  return (
    <Router>
      <Header />
      <Container sx={{ marginTop: 18}}> {/* no header overlap */}
        <Routes>
            <Route path="/" element={<Home />} /> {/* Root URL is Home Page */}
            <Route path="/liveable" element={<Liveable />} /> {/* Route for the Liveable page */}
            <Route path="/maximum-price" element={<MaximumPrice />} /> {/* Route for the Maximum Price page */}
            <Route path="/suburb-model" element={<SuburbModel />} /> {/* Route for the Suburb Model page */}
        </Routes>
      </Container>
      
     
      
    </Router>
  );
}

export default App;