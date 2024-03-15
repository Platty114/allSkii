import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Trails from './pages/Trails';
import Reviews from './pages/Reviews';
import Blogs from './pages/Blogs';
import Events from './pages/Events';
import Topbar from './components/Topbar';

function App() {
  return (
    <div>
      <Router>
        <Topbar />
        <Routes>
          <Route path="/" element={<Login />} />
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

export default App;
