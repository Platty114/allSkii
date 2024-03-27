import React, { useState } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import PersonIcon from '@mui/icons-material/Person';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import WindPowerIcon from '@mui/icons-material/WindPower';
import FilterDramaIcon from '@mui/icons-material/FilterDrama';
import axios from 'axios'; 

import "./Home.css";
import background from '../media/Background.png';

function Home() {
  const [selectedSkiHill, setSelectedSkiHill] = useState('');
  const [snowfall, setSnowfall] = useState('');
  const [temp, setTemp] = useState('');
  const [feelsLike, setFeelsLike] = useState('');
  const [visibility, setVisibility] = useState('');
  const [wind, setWind] = useState('');
  const [cloudCoverage, setCloudCoverage] = useState('');

  const handleSkiHillChange = (event) => {

    setSelectedSkiHill(event.target.value);

    console.log(event.target.value.name)

    // Fetch data for the selected ski hill
    axios.get(`http://localhost:8080/${selectedSkiHill.latitude}/${selectedSkiHill.longitude}`)
      .then((response) => {
        const data = response.data;
        // Update state variables with the received data
        setSnowfall(data.lastHourSnow);
        setTemp(data.temp);
        setFeelsLike(data.feelsLike);
        setVisibility(data.visibility);
        setWind(data.wind);
        setCloudCoverage(data.cloudCoverage);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const skiHills = [
    { name: 'Fernie', id: 'fernie', longitude: -115.0873, latitude: 49.4627 },
    { name: 'Kicking Horse', id: 'kickinghorse', longitude: -117.0483, latitude: 51.2976 },
    { name: 'Nakiska', id: 'nakiska', longitude: -115.1511, latitude: 50.9427 },
    { name: 'Sunshine', id: 'sunshine', longitude: -115.7765, latitude: 51.0785 },
    { name: 'Lake Louise', id: 'lakelouise', longitude: -116.1622, latitude: 51.4419 },
    { name: 'Revelstoke', id: 'revelstoke', longitude: -118.1631, latitude: 50.9584 },
    { name: 'Panorama', id: 'panorama', longitude: -116.238157, latitude: 50.460374 },
    { name: 'Norquay', id: 'norquay', longitude: -115.6068, latitude: 51.2053 },
    { name: 'Kimberley', id: 'kimberley', longitude: -116.0048, latitude: 49.6879 },
    { name: 'SilverStar', id: 'silverStar', longitude: -119.061, latitude: 50.3598 },
    { name: 'Sun Peaks', id: 'sunPeaks', longitude: -119.8891, latitude: 50.8837 },
    { name: 'Big White', id: 'bigWhite', longitude: -118.93528, latitude: 49.716 },
  ];

  const iconList = [
    <AcUnitIcon sx={{ fontSize: '6rem' }} />,
    <ThermostatIcon sx={{ fontSize: '6rem' }} />,
    <PersonIcon sx={{ fontSize: '6rem' }} />,
    <VisibilityOffIcon sx={{ fontSize: '6rem' }} />,
    <WindPowerIcon sx={{ fontSize: '6rem' }} />,
    <FilterDramaIcon sx={{ fontSize: '6rem' }} />,
  ];

  const textValues = [snowfall, temp, feelsLike, visibility, wind, cloudCoverage];

  return (
    <div className='content'>
      <div className="top" >
        <div className="overlay-text">
          <h1>AllSkii</h1>
        </div>
      </div>
      <div className='bottom'>
        <p>All your great adventures, begin here</p>
        <div className="search-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <FormControl style={{ width: '300px', marginRight: '10px' }}>
            <InputLabel id="ski-hill-label">Select Ski Hill</InputLabel>
            <Select
            labelId="ski-hill-label"
            id="ski-hill-select"
            value={selectedSkiHill}
            onChange={handleSkiHillChange}
            style={{ height: '56px' }} 
          >
            {skiHills.map((skiHill) => (
              <MenuItem key={skiHill.id} value={skiHill}>{skiHill.name}</MenuItem>
            ))}
          </Select>

          </FormControl>
          <Button variant="outlined" style={{ height: '56px', color: '#006400', borderColor: '#006400' }}>Go - to</Button>
        </div>
        <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center" width="100%" borderRadius="5px" padding="10px" mt={2}>
          <Box display="flex" justifyContent="space-between" width="80%">
            {iconList.map((icon, index) => (
              <div key={index} style={{ textAlign: 'center' }}>
                {icon}
                <p style={{ fontSize: '1.5rem' }}>{textValues[index]}</p>
              </div>
            ))}
          </Box>
        </Box>
      </div>
    </div>
  );
}

export default Home;
