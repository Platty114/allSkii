import React, {useState} from 'react';
import './ProfileCard.css';
import profileSkiing from '../media/profile-final-skii.png';
import { useAuth } from './AuthContext';
import axios from 'axios';
import { Button } from '@mui/material';


const ProfileCard = () => {
    const { username, firstName, lastName, logout } = useAuth();
    const [fname, setfname] = useState('');
    const [lname, setlname]  =useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleChangePassword = async () => {
        if (newPassword) {
            try {
                
                
                const response = await axios.put('http://localhost:8080/updatePassword', {
                    email: username, // Assuming the email is the username, adjust if necessary
                    password: newPassword
                });
                
                if (response.status === 200) {
                    alert('Password changed successfully.');
                    console.log(newPassword);
                    setNewPassword(''); // Reset the password field after successful change
                } else {
                    alert('Failed to change password.');
                }
            } catch (error) {
                console.error('Error changing password:', error);
                alert('Error changing password. Please try again.');
            }
        } else {
            alert('Please enter a new password.');
        }
    };

    const handleLogOut = () => {

        logout();
    }
    
    return (
        <div className="profileContainer">
          <div className="profileBox">
            <img src={profileSkiing} alt="Skiing Profile" className="profileImage" />
            <div className="profileText">
                    
                    <h2><span className='blue'>Username:</span> {username}</h2>
                    <h2><span className='blue'>Name: </span>{firstName} {lastName}</h2>
                    <h2 className='blue'> Change Password:</h2>
                    <div className='pass'>
                        
                        <input
                            className="inputPass"
                            type="password" // Changed to password type for privacy
                            placeholder='Enter new password...'
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <Button onClick={handleChangePassword} variant="contained" color="primary" className='square-button'>
                            Change 
                        </Button>
                    </div>
                    <Button onClick={handleLogOut} variant="contained" color="secondary" className='logout-button'>
                            Log Out 
                        </Button>
                </div>
                
          </div>
        </div>
      );
};

export default ProfileCard;
