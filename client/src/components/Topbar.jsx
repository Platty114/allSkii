import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DownhillSkiingIcon from '@mui/icons-material/DownhillSkiing';


const Topbar = () => {
  // Define your navigation links here
  const links = [
    { text: 'Home', route: '/home' },
    { text: 'Trails', route: '/trails' },
    { text: 'Events', route: '/events' },
    // Add additional links as needed
  ];

  return (
    <div style={{ backgroundColor: '#222', color: 'white', height: '60px', width: '100%', display: 'flex', alignItems: 'center', padding: '0 20px', boxShadow: '0 15px 55px rgba(0, 0, 0, 0.6)', position: 'fixed', top: '0', left: '0', zIndex: '1000' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginRight: '30px' }}>
        <DownhillSkiingIcon style={{ marginRight: '10px', fontSize: '1.8rem' }} />
        <span style={{ fontWeight: 'bold', fontSize: '1.4rem' }}>AllSkii</span>
      </div>

      <div style={{ flex: 1, display: 'flex', justifyContent: 'space-evenly', height: '100%', alignItems: 'center' }}>
        {links.map((link, index) => (
          <NavLink
            key={index}
            to={link.route}
            style={({ isActive }) => ({
              textDecoration: 'none',
              color: isActive ? '#b3daff' : 'white',
              fontWeight: 'normal',
              margin: '0 15px',
              fontSize: '1rem',
              transition: 'color 0.2s',
              cursor: 'pointer'
            })}
          >
            {link.text}
          </NavLink>
        ))}
      </div>

      <NavLink
        to="/profile"
        style={({ isActive }) => ({
          textDecoration: 'none',
          color: isActive ? '#b3daff' : 'white',
          marginLeft: '20px',
          marginRight: '40px'
        })}
      >
        <AccountCircleIcon style={{ fontSize: '2rem' }} />
      </NavLink>
    </div>
  );
};

export default Topbar;



