import React from 'react';
import { Box, Grid, Card, CardContent } from '@mui/material';
import Calendar from '../components/Calendar'; // Adjust the import path as necessary

function Events() {
  return (
    <div>
      <h2>Events Page</h2>
      <Box sx={{ flexGrow: 1, margin: 3, height: 'calc(100vh - 80px)' }}>
        <Grid container spacing={3} sx={{ height: '100%' }}>
          <Grid item xs={12} sx={{ height: '25%' }}>
            <Card variant="outlined" sx={{ height: '100%' }}>
              <CardContent>
                Top Box Content
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sx={{ height: '75%' }} container spacing={2}>
            <Grid item xs={4} sx={{ height: '100%' }}>
              <Card variant="outlined" sx={{ height: '100%' }}>
                <CardContent>
                  Left Box Content
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={8} sx={{ height: '100%' }}>
              <Card variant="outlined" sx={{ height: '100%' }}>
                <CardContent>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Events;