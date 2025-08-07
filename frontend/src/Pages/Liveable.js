// src/Pages/Liveable.js
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, Paper, Box } from '@mui/material';
import LiveableForm from '../components/LiveableForm.js'; // Importing LiveableForm component
import LiveableResult from '../components/LiveableResult'; // Importing LiveableResult component

function Liveable() {
  const [suburb, setSuburb] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (suburb) => {
    setError('');
    setPrediction(null);
    setLoading(true);

    try {
      const response = await axios.get(`https://housingpredictionbackend-c9hwedazcjezc0ae.australiasoutheast-01.azurewebsites.net/liveablearea/predict/${suburb}`);
      setPrediction(response.data.predicted_liveable_area);
    } catch (err) {
      setError('Error predicting liveable area. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Liveable Area Predictor
        </Typography>
        <Paper elevation={3} sx={{ p: 3 }}>
          <LiveableForm onSubmit={handleSubmit} loading={loading} /> {/* Using LiveableForm */}
        </Paper>
        <LiveableResult prediction={prediction} error={error} /> {/* Using LiveableResult */}
      </Box>
    </Container>
  );
}

export default Liveable;