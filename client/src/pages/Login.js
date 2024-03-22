import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import LoginValid from './LoginValid';
import './Login.css'; // Ensure you have this CSS in your project, saved as Login.css
import { useNavigate } from 'react-router-dom';
import Home from './Home';
import { useAuth } from './AuthContext';



const Login = () => {
  
  // State hooks for username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const {login} = useAuth();
  // Function to handle form submission
  const handleSubmit = (event) => {
  event.preventDefault(); // Prevent the default form submission behavior
    
    if(username && password){
      ReactDOM.render(
        <React.StrictMode>
            <LoginValid />
        </React.StrictMode>,
        document.getElementById('root')
    );
    }else{

        window.alert("Username and password");

    }
    
   
  

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
        <a rel="noopener noreferrer" href="#" className="">Sign up</a>
      </p>
    </div>
    </div>
  );
};

export default Login;
