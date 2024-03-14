import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DownhillSkiingIcon from '@mui/icons-material/DownhillSkiing';

const Topbar = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [clickedIndex, setClickedIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const handleClick = (index) => {
    setClickedIndex(index);
  };

  const links = [
    { text: 'Home', route: '/' },
    { text: 'Trails', route: '/trails' },
    { text: 'Reviews', route: '/reviews' },
    { text: 'Blogs', route: '/blogs' },
    { text: 'Events', route: '/events' },
  ];

  const isLinkActive = (route) => {
    // Check if the current route matches the link's route
    return window.location.pathname === route;
  };

  return (
    <div style={{ backgroundColor: '#222', color: 'white', height: '60px', width: '100%', display: 'flex', alignItems: 'center', padding: '0 20px', boxShadow: '30 15px 55px rgba(0, 0.5, .5, 0.6)', position: 'fixed', top: '0', left: '0', zIndex: '1' }}>
      {/* AllSkii with icon */}
      <div style={{ display: 'flex', alignItems: 'center', marginRight: '30px' }}>
        <DownhillSkiingIcon style={{ marginRight: '10px', fontSize: '1.8rem' }} />
        <span style={{ fontWeight: 'bold', fontSize: '1.4rem' }}>AllSkii</span>
      </div>

      {/* Centered menu links with border */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'space-evenly', height: '100%', alignItems: 'center' }}>
        {links.map((link, index) => (
          <Link
            key={index}
            to={link.route}
            style={{ textDecoration: 'none', color: clickedIndex === index + 1 ? '#b3daff' : 'white', fontWeight: isLinkActive(link.route) ? 'bold' : 'normal', margin: '0 15px' }}
            onClick={() => handleClick(index + 1)}
            onMouseEnter={() => handleMouseEnter(index + 1)}
            onMouseLeave={handleMouseLeave}
          >
            <span style={{ cursor: 'pointer', transition: 'font-size 0.2s', fontSize: hoveredIndex === index + 1 ? '1.5rem' : '1rem', fontWeight: hoveredIndex === index + 1 ? 'bold' : 'normal' }}>{link.text}</span>
          </Link>
        ))}
      </div>

      {/* Add additional buttons such as settings and user profile */}
      <Link
        to="/profile"
        style={{ textDecoration: 'none', color: 'white', marginLeft: '20px', marginRight: '40px' }}
      >
        <AccountCircleIcon style={{ fontSize: '2rem' }} />
      </Link>
    </div>
  );
};

export default Topbar;
