// src/components/LiveableResult.js
import React from 'react';
import { Paper, Typography } from '@mui/material';

function LiveableResult({ prediction, error }) {
  return (
    <>
      {prediction && prediction !== "unknown" && (
        <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
          <Typography variant="h5" gutterBottom>
            This suburb liveability is {prediction}, based on the statistic in 10 years from 2002 to 2020.
          </Typography>
        </Paper>
      )}

      {prediction && prediction === "unknown" && (
        <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
          <Typography variant="h5" gutterBottom>
            Suburb not found in the dataset. Please try other suburbs
          </Typography>
        </Paper>
      )}


      {error && (
        <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
          <Typography variant="h5" gutterBottom>
            Unable to retrive the data from API service 
          </Typography>
        </Paper>
      )}
    </>
  );
}

export default LiveableResult;