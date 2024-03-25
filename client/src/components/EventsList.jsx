import React from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, Button } from '@mui/material';

export default function EventList() {
  const events = ['Event 1', 'Event 2', 'Event 3']; // Example events

  return (
    <List>
      {events.map((event, index) => (
        <ListItem key={index} divider>
          <ListItemText primary={event} />
          <ListItemSecondaryAction>
            <Button variant="outlined" color="primary">Details</Button>
            <Button 
              variant="contained" 
              color="secondary" 
              sx={{ 
                ml: 1, 
                fontWeight: 'bold', 
                boxShadow: 3, 
                borderRadius: 2, 
                '&:hover': {
                  backgroundColor: 'deepOrange[500]', // Change this color based on your theme or preference
                  boxShadow: 5,
                }
              }}
            >
              Sign Up
            </Button>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
}
