import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import Trails from './Trails';
import Reviews from './Reviews';
import Blogs from './Blogs';
import Events from './Events';
import Topbar from '../components/Topbar';
import "./LoginValid.css";

function LoginValid() {
  return (
    <div>
      <Router>
        <Topbar />
        <Routes>
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/trails" element={<Trails />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/events" element={<Events />} />
        </Routes>
      </Router>
    </div>
  );
}

export default LoginValid;
