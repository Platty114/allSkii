import React, { useState, useEffect } from 'react';
import { Box, Grid, Card, CardContent, ThemeProvider, createTheme, Typography } from '@mui/material';
import axios from 'axios';
import Calendar from '../components/Calendar';
import TopFilters from '../components/EventsTopFilters';
import EventList from '../components/EventsList';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function Events() {
  const [eventsData, setEventsData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [filterSkiHill, setFilterSkiHill] = useState(null);
  const [filterName, setFilterName] = useState(null);
  const [filterCategory, setFilterCategory] = useState(null);
  const [filterPricing, setFilterPricing] = useState(null);

  useEffect(() => {
    axios.get(`https://events-service-7btvt4xvwq-pd.a.run.app/read/all`)
      .then(response => {
        if (eventsData === null) {
          setEventsData(response.data);
          console.log('Data Read correctly');
          console.log(response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching events data:', error);
      });
  }, [eventsData]);

  useEffect(() => {
    const applyFilters = () => {
        if (!eventsData) return; // Exit if eventsData is null

        let filteredData = new Set(eventsData);

        // Apply filters
        if (filterSkiHill) {
            filteredData = new Set([...eventsData].filter(event => event.hill === filterSkiHill));
        }

        if (filterName) {
            filteredData = new Set([...filteredData].filter(event => event.name.includes(filterName)));
        }

        if (filterCategory) {
            filteredData = new Set([...filteredData].filter(event => event.category === filterCategory));
        }

        if (filterPricing) {
          filteredData = new Set([...filteredData].filter(event => event.pricing < filterPricing));
        }


        // Convert set back to array
        setFilteredData([...filteredData]);
    };

    // Call applyFilters whenever any filter changes
    applyFilters();

}, [eventsData, filterSkiHill, filterName, filterCategory, filterPricing]);


  return (
    <ThemeProvider theme={darkTheme}>
      <div style={{ backgroundColor: darkTheme.palette.background.default, minHeight: '97.4vh' }}>
        <h2 style={{ color: darkTheme.palette.text.primary }}>Events Page</h2>
        <Box sx={{ flexGrow: 1, margin: 3, height: 'calc(100vh - 80px)' }}>
          <Grid container spacing={3} sx={{ height: '100%' }}>
            <Grid item xs={12} sx={{ height: '15%' }}>
              <Card variant="elevation" elevation={0} sx={{ height: '100%' }}>
                <CardContent>
                  <TopFilters 
                    setFilterSkiHill={setFilterSkiHill}
                    setFilterName={setFilterName}
                    setFilterCategory={setFilterCategory}
                    setFilterPricing={setFilterPricing}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sx={{ height: '85%' }} container spacing={2}>

              {/* <Grid item xs={4} sx={{ height: '100%' }}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" component="div" sx={{ mb: 2, fontWeight: 'medium' }}>
                      Upcoming Events:
                    </Typography>
                    <EventList eventsData={eventsData} />
                  </CardContent>
                </Card>
              </Grid> */}

          <Grid container justifyContent="center" alignItems="center" sx={{ height: '100%' }}>
              {/* // change xs = {8} if you want to use the other component commented out above */}
              <Grid item xs={10} sx={{ height: '100%'}} > 
                <Card variant="elevation" elevation={0} sx={{ height: '100%' }}>
                  <CardContent
                    sx={{
                      height: '100%',
                      overflow: 'auto',
                      '&::-webkit-scrollbar': {
                        display: 'none',
                      },
                      scrollbarWidth: 'none',
                      msOverflowStyle: 'none',
                    }}
                  >
                    {/* Pass eventsData to the Calendar component if filteredData is null */}
                    <Calendar eventsData={filteredData || eventsData} />
                  </CardContent>
                </Card>
              </Grid>
              </Grid>


            </Grid>
          </Grid>
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default Events;
