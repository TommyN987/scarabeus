import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import ProtectedRoute from './components/protected-route/ProtectedRoute';
import Sidebar from './components/sidebar/Sidebar';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path='/sidebar' element={<Sidebar />} />
    </Routes>
  );
}

export default App;
