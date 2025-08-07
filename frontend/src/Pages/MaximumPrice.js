// src/Pages/MaximumPrice.js
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, Paper, Box } from '@mui/material';
import MaximumPriceForm from '../components/MaximumPriceForm'; // Importing MaximumPriceForm component
import MaximumPriceResult from '../components/MaximumPriceResult'; // Importing MaximumPriceResult component
import MaximumPriceChart from '../components/MaximumPriceChart'; // Importing MaximumPriceChart component

function MaximumPrice() {
  const [distance, setDistance] = useState('');
  const [predictedPrice, setPredictedPrice] = useState(null);
  const [curveData, setCurveData] = useState([]);
  const [maxPriceData, setMaxPriceData] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async (distance) => {
    setError('');
    setPredictedPrice(null);

    try {
      // Fetch predicted price
      const response = await axios.get(`https://housingpredictionbackend-c9hwedazcjezc0ae.australiasoutheast-01.azurewebsites.net/maximumprice/predict/${distance}`);
      if ((distance <0) || (distance > 50))
      {
        
        setPredictedPrice(0)
        setDistance(0)
      }
      else
      {
        setPredictedPrice(response.data.predicted_price);
        setDistance(distance)
      }
      
      
      // Fetch curve and max price data from the backend
      const curveResponse = await axios.get('https://housingpredictionbackend-c9hwedazcjezc0ae.australiasoutheast-01.azurewebsites.net/maximumprice/curve-data');
      setCurveData(curveResponse.data.curve_data);
      setMaxPriceData(curveResponse.data.max_price_data);
      
    } catch (err) {
      setError('Error fetching data. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          House Price Prediction
        </Typography>
        <Paper elevation={3} sx={{ p: 3 }}>
          <MaximumPriceForm onSubmit={handleSubmit} /> {/* Using MaximumPriceForm */}
        </Paper>
        
        {/* Result Component */}
        <MaximumPriceResult predictedPrice={predictedPrice} error={error} />
        
        {/* Chart Component */}
        {maxPriceData.length > 0 && (
          <MaximumPriceChart 
            curveData={curveData} 
            maxPriceData={maxPriceData} 
            predictedPoint= {[{ Distance: distance, Price: predictedPrice }] } 
          />
        )}
      </Box>
    </Container>
  );
}

export default MaximumPrice;