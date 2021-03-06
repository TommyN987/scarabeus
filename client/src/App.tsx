import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/login/Login';
import Register from './pages/register/Register';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/dashboard/*' element={<Dashboard />} />
    </Routes>
  );
}

export default App;
