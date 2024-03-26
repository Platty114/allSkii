import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import Trails from './Trails';
import Reviews from './Reviews';
import Blogs from './Blogs';
import Events from './Events';
import Topbar from '../components/Topbar';
import ProfileCard from './ProfileCard';
import "./LoginValid.css";
import { useAuth } from './AuthContext';

function LoginValid() {
  const {isLoggedIn} = useAuth();

  if(!isLoggedIn){
  return <Navigate to="/login"/>;
}
  
  return (
    <div>
        <Topbar />
        <Routes>
        <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/trails" element={<Trails />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/events" element={<Events />} />
          <Route path="/profile" element={<ProfileCard />} />
        </Routes>
    </div>
  );
}

export default LoginValid;
