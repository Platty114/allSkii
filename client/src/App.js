import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Trails from './pages/Trails';
import Reviews from './pages/Reviews';
import Blogs from './pages/Blogs';
import Events from './pages/Events';
import Topbar from './components/Topbar';
import LoginValid from './pages/LoginValid';
import { AuthProvider, useAuth } from './pages/AuthContext';

function App() {
  const isLoggedIn = false;
 
  return (
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  </AuthProvider>
  );
}

export default App;
