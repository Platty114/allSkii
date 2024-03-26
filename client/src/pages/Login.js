import React, {useState} from 'react';

import './Login.css'; 

import { useAuth } from './AuthContext';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {AuthContext} from "./AuthContext";


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
 
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (username && password) {
      try {
        
        const response = await axios.post('http://localhost:2345/signin', { email: username, password: password, } , {withCredentials: true});
        if (response.status === 200) {
          login(); // Log the user in (update your auth context state)
          navigate('/home'); // Navigate to the Home page after login
        }
      } catch (error) {
        console.error('Login failed:', error);
        window.alert('Login failed: Incorrect username or password.');
      }
    } else {
      window.alert("Username and password are required.");
    }
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    navigate('/signup'); // Use navigate to switch to the SignUp page
  };

  return (
   
   <div className='login-container'>
    <div className="form-container">
      <p className="title">Login</p>
      <form className="form">
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
              type="text"
              name="username"
              id="username"
              placeholder=""
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Set username to the input's current value
            />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
              type="password"
              name="password"
              id="password"
              placeholder=""
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Set password to the input's current value
            />
          <div className="forgot">
            <a rel="noopener noreferrer" href="#">Forgot Password ?</a>
          </div>
        </div>
        <button type="submit" className="sign" onClick={handleSubmit}>Sign in</button>
      </form>
      <div className="social-message">
        <div className="line"></div>
        <p className="message">Login with social accounts</p>
        <div className="line"></div>
      </div>
      <div className="social-icons">
        
      </div>
      <p className="signup">Don't have an account?
        <a rel="noopener noreferrer" href="#" className="" onClick={handleSignUp} >Sign up</a>
      </p>
    </div>
    </div>
  );
};

export default Login;
