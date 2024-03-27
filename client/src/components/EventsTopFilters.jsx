import React from 'react';
import { Grid, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export default function TopFilters({ setFilterSkiHill, setFilterName, setFilterCategory, setFilterPricing }) {
  // Event handler for Ski Hill dropdown
  const handleSkiHillChange = (event) => {
    const value = event.target.value;
    setFilterSkiHill(value); // Update filter state variable
  };

  // Event handler for Name dropdown
  const handleNameChange = (event) => {
    const value = event.target.value;
    setFilterName(value); // Update filter state variable
  };

  // Event handler for Category dropdown
  const handleCategoryChange = (event) => {
    const value = event.target.value;
    setFilterCategory(value); // Update filter state variable
  };

  // Event handler for Pricing dropdown
  const handlePricingChange = (event) => {
    const value = event.target.value;
    setFilterPricing(value); // Update filter state variable
  };

  // Ski Hills
  const skiHills = [
    'Revelstoke',
    'Kickinghorse',
    'Fernie',
    'Nakiska',
    'Norquay',
    'Kimberley',
    'Sunshine',
    'SunPeaks',
    'Lakelouise',
    'Panorama',
    'BigWhite',
    'SilverStar'
  ];

  // Names
  const names = [
    'Snow Sculpture Contest',
    'Mountain Restaurant Tasting',
    'Advanced Ski Racing Lessons',
    'Ski Patrol Demonstration',
    'Advanced Snowboarding Lessons',
    'Apres-Ski Party',
    'Ski and Snowboard Festival',
    'Intermediate Skiing Lessons',
    'Beginner Skiing Lessons',
    'Freestyle Ski Show',
    'Torchlight Parade',
    'Ski Gear Expo',
    'Beginner Ski Racing Lessons',
    'Night Skiing Experience',
    'Ski Cross Competition',
    'Ski Resort Charity Event',
    'Ski Instructor Workshop',
    'Intermediate Ski Racing Lessons',
    'Beginner Snowboarding Lessons',
    'Ski Hill Photography Workshop',
    'Intermediate Snowboarding Lessons',
    'Snow Sculpture Contest',
    'Ski-In Movie Night',
    'Ski Resort Wine Tasting',
    'Apres-Ski Party'
    // Add more names as per your data
  ];

  // Categories
  const categories = [
    'Snowboarding',
    'Mountain Dining',
    'Ski Racing Lessons',
    'Safety Lessons',
    'Apres-Ski',
    'Skiing',
    'Ski Equipment',
    'Mountain Adventure',
    'Ski Competitions'
    // Add more categories as per your data
  ];

  // Pricing Options
  const pricingOptions = [
    '30', 
    '50', 
    '80',
    '100',
    '120'];


  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} md={2}>
        <Typography variant="h5" sx={{ mb: { xs: 2, md: 0 }, fontWeight: 'medium' }}>
          Filter By:
        </Typography>
      </Grid>
      {/* Ski Hill Dropdown */}
      <Grid item xs={6} sm={3} md={2.5}>
        <FormControl fullWidth>
          <InputLabel id="ski-hill-label">Ski Hill</InputLabel>
          <Select
            labelId="ski-hill-label"
            id="ski-hill"
            label="Ski Hill"
            onChange={handleSkiHillChange}
          >
            <MenuItem value="">None</MenuItem>
            {skiHills.map((hill, index) => (
              <MenuItem key={index} value={hill}>{hill}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      {/* Name Dropdown */}
      <Grid item xs={6} sm={3} md={2.5}>
        <FormControl fullWidth>
          <InputLabel id="name-label">Name</InputLabel>
          <Select
            labelId="name-label"
            id="name"
            label="Name"
            onChange={handleNameChange}
          >
            <MenuItem value="">None</MenuItem>
            {names.map((name, index) => (
              <MenuItem key={index} value={name}>{name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      {/* Category Dropdown */}
      <Grid item xs={6} sm={3} md={2.5}>
        <FormControl fullWidth>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            id="category"
            label="Category"
            onChange={handleCategoryChange}
          >
            <MenuItem value="">None</MenuItem>
            {categories.map((category, index) => (
              <MenuItem key={index} value={category}>{category}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      {/* Pricing Dropdown */}
      <Grid item xs={6} sm={3} md={2.5}>
        <FormControl fullWidth>
          <InputLabel id="pricing-label">Pricing</InputLabel>
          <Select
            labelId="pricing-label"
            id="pricing"
            label="Pricing"
            onChange={handlePricingChange}
          >
            <MenuItem value="">None</MenuItem>
            {pricingOptions.map((option, index) => (
              <MenuItem key={index} value={option}>{option}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );

}
