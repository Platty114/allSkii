import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Trails from './pages/Trails';
import Events from './pages/Events';
import Topbar from './components/Topbar';
import LoginValid from './pages/LoginValid';
import { AuthProvider, useAuth } from './pages/AuthContext';
import { Navigate } from 'react-router-dom';
import SignUp from './pages/SignUp';

// function useAuthenticated() {
//   const { isLoggedIn } = useAuth();
//   return isLoggedIn;
// }
// function ProtectedRoute({ children }) {
//   const { isLoggedIn } = useAuth(); // Use the auth status from context
//   return isLoggedIn ? children : <Navigate to="/login" />;
// }
function App() {
  
  return (
  <AuthProvider>
   <Router>      
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/*" element={<LoginValid/>} />
        </Routes>
      </Router>
  </AuthProvider>
  );
}

export default App;
