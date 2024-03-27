import React from 'react';
import "./Home.css";
import background from '../media/Background.png';

function Home() {
  
  return (
    <div className='content'>
      <div className="top" > {/* Corrected this line */}
        <div className="overlay-text">
          <h1>AllSkii</h1>
        </div>
      </div>
      <div className='bottom'>
          <p>All your great adventures, begin here</p>
        <div className="search-container">
            <input type="text" placeholder="City or Zipcode" />
          </div>
      </div>
    </div>
  );
}

export default Home;


