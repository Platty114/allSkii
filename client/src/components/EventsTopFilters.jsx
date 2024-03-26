import React from 'react';
import { Grid, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export default function TopFilters() {
  // Example state for the selected values
  const [skiHill, setSkiHill] = React.useState('');
  const [name, setName] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [pricing, setPricing] = React.useState('');

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
            value={skiHill}
            label="Ski Hill"
            onChange={(e) => setSkiHill(e.target.value)}
          >
            <MenuItem value={10}>Hill 1</MenuItem>
            <MenuItem value={20}>Hill 2</MenuItem>
            <MenuItem value={30}>Hill 3</MenuItem>
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
            value={name}
            label="Name"
            onChange={(e) => setName(e.target.value)}
          >
            <MenuItem value={10}>Name 1</MenuItem>
            <MenuItem value={20}>Name 2</MenuItem>
            <MenuItem value={30}>Name 3</MenuItem>
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
            value={category}
            label="Category"
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value={10}>Category 1</MenuItem>
            <MenuItem value={20}>Category 2</MenuItem>
            <MenuItem value={30}>Category 3</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      {/* Pricing Dropdown */}
      <Grid item xs={6} sm={3} md={2.5}>
        <FormControl fullWidth>
          <InputLabel id="pricing-label"> Pricing {'<'} </InputLabel>
          <Select
            labelId="pricing-label"
            id="pricing"
            value={pricing}
            label="Pricing"
            onChange={(e) => setPricing(e.target.value)}
          >
            <MenuItem value={10}>Pricing 1</MenuItem>
            <MenuItem value={20}>Pricing 2</MenuItem>
            <MenuItem value={30}>Pricing 3</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}




