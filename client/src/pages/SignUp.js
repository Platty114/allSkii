import React from 'react';
import  ReactDOM  from 'react-dom';
import './SignUp.css'; 
import Login from './Login';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUp() {
  const navigate = useNavigate();
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = {
      firstName: event.target.firstname.value,
      lastName: event.target.lastname.value,
        email : event.target.email.value,
       password : event.target.password.value,
    };


    try {
      console.log(userData.email + "   " + userData.password);
      const response = await axios.post('http://localhost:2345/signup', userData);
      if (response.status === 200) {
        window.alert("Signup successful!");
        navigate('/login'); // Navigate to the login page after successful signup
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Signup failed:', error.response.data);
        window.alert("Signup failed: " + (error.response.data.error || 'Unknown Error'));
    } else if (error.request) {
        // The request was made but no response was received
        console.error('Signup failed: No response from server', error.request);
        window.alert("Signup failed: No response from the server. Please try again.");
    } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Signup error:', error.message);
        window.alert("Signup error: " + error.message);
    }
    }
  };

  const handleSignIn = (event) => {
    event.preventDefault();
    navigate('/login'); // Use navigate to switch to the Login page
  };
  
  
  return (
    <div className="whole">
   <form className="form" onSubmit={handleSubmit}>
      <p className="title">Register </p>
      <p className="message">Signup now and get full access to our app. </p>
      <div className="flex">
        <label>
          <input className="input" type="text" name="firstname"required />
          <span>Firstname</span>
        </label>
        <label>
          <input className="input" type="text" name="lastname" required />
          <span>Lastname</span>
        </label>
      </div>  
      <label>
        <input className="input" name="email" type="email" required />
        <span>Email</span>
      </label> 
      <label>
        <input className="input" type="password" name="password" required />
        <span>Password</span>
      </label>
      <label>
        <input className="input" type="password" name="confirmPassword" required />
        <span>Confirm password</span>
      </label>
      <button className="submit">Submit</button>
      <p className="signin">Already have an account ? <a href="##" onClick={handleSignIn}>Signin</a> </p>
    </form>
    </div>
  );
}

export default SignUp;
