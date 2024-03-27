import React from 'react';
import { Box, Grid, Card, CardContent, ThemeProvider, createTheme, Typography } from '@mui/material';
import Calendar from '../components/Calendar'; // Adjust the import path as necessary
import TopFilters from '../components/EventsTopFilters'; // Make sure this path is correct
import EventList from '../components/EventsList'; // Make sure this path is correct

// Create a theme instance.
const darkTheme = createTheme({
  palette: {
    mode: 'dark', // Switching the theme mode to dark
  },
});

function Events() {
  return (
    <ThemeProvider theme={darkTheme}>
      <div style={{ backgroundColor: darkTheme.palette.background.default, minHeight: '97.4vh' }}>
        <h2 style={{ color: darkTheme.palette.text.primary }}>Events Page</h2>
        <Box sx={{ flexGrow: 1, margin: 3, height: 'calc(100vh - 80px)' }}>
          <Grid container spacing={3} sx={{ height: '100%' }}>
            <Grid item xs={12} sx={{ height: '15%' }}>
              <Card variant="elevation" elevation={0} sx={{ height: '100%' }}>
                <CardContent>
                   {/* Integrate TopFilters component with styled "Filter By:" text */}
                  <TopFilters />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sx={{ height: '85%' }} container spacing={2}>
              <Grid item xs={4} sx={{ height: '100%' }}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                  <CardContent>
                  <Typography variant="h6" component="div" sx={{ mb: 2, fontWeight: 'medium' }}>
                    Upcoming Events:
                  </Typography>
                    <EventList />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={8} sx={{ height: '100%' }}>
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
                    <Calendar />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default Events;
