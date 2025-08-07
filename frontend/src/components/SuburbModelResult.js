// src/components/SuburbModelResult.js
import React from 'react';
import { Paper, Typography, List, ListItemText } from '@mui/material';

function SuburbModelResult({ suburbResults }) {
  
  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Predicted Suburbs based on criteria:
      </Typography>
      <List>
        {suburbResults.map((suburb, index) => (
          <ListItemText key={index} primary={`${index + 1}. ${suburb.Suburb}`} />
        ))}
      </List>
    </Paper>
  );
}

export default SuburbModelResult;