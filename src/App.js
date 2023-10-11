import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes
import Login from './components/login';
import Signup from './components/signup';
import Home from './components/Home';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} /> 
          <Route path="/" element={<Login />} /> 
          <Route path='/home' element={<Home/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
