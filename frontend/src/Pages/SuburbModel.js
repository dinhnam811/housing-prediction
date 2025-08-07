// src/Pages/SuburbModel.js
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, Paper, Box, Grid, TextField, Button, CircularProgress, List, ListItem, ListItemText } from '@mui/material';
import SuburbModelForm from '../components/SuburbModelForm'; // Importing SuburbModelForm component
import SuburbModelResult from '../components/SuburbModelResult'; // Importing SuburbModelResult component
import SuburbModelChart from '../components/SuburbModelChart'; // Importing SuburbModelChart component
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );


function SuburbModel() {
  const [landSize, setLandSize] = useState('');
  const [price, setPrice] = useState('');
  const [scaledInput, setScaledInput] = useState([]);
  const [suburbResults, setSuburbResults] = useState([]);
  const [clusterCentres, setClusterCentres] = useState([]);
  const [dataPoints, setDataPoints] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuburbResults([]);
    setClusterCentres([]);
    setScaledInput([]);
    setDataPoints([]);
    setLoading(true);

    try {
      const response = await axios.get(`https://housingpredictionbackend-c9hwedazcjezc0ae.australiasoutheast-01.azurewebsites.net/suburbmodel/predict/${landSize}/${price}`);
      setSuburbResults(response.data.predicted_suburbs);
      setClusterCentres(response.data.cluster_centers);
      setScaledInput(response.data.scaled_input);
      setDataPoints(response.data.data_points);
      
    } catch (err) {
      setError('Error retrieving suburb suggestions. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const chartData = {
    datasets: [
      {
        label: 'Cluster Centers',
        data: clusterCentres.map(center => ({
          x: center[0], 
          y: center[1], 
          r: 10,
        })),
        pointRadius: 10,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
      {
        label: 'User Input',
        data: scaledInput.map(center => ({
          x: center[0], 
          y: center[1], 
          r: 10,
        })),
        backgroundColor: 'rgba(0, 0, 120, 0.8)', 
        pointRadius: 8,
      },
      {
        label: 'Data Points',
        data: dataPoints.map(point => ({
          x: point[0],  
          y: point[1],  
          r: 5,
        })),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ textAlign: 'center' }}>
          HOUSING SUBURB FINDER
        </Typography>

        <Paper elevation={3} sx={{ p: 3 }}>
          <SuburbModelForm 
            landSize={landSize} 
            price={price} 
            setLandSize={setLandSize} 
            setPrice={setPrice} 
            handleSubmit={handleSubmit}
            loading={loading}
          />
        </Paper>

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        {landSize > 0 && landSize < 100000 && price > 0 && price < 9000000 && (
          <>
          {dataPoints.length > 0 && clusterCentres.length > 0 && scaledInput.length > 0 && (
          <SuburbModelChart chartData={chartData} />
          )}

          {suburbResults.length > 0 && (
            <SuburbModelResult suburbResults={suburbResults} />
          )}
          </>          
        )} 

        {(landSize < 0 || landSize > 100000) && (
          <Typography variant="h5" gutterBottom sx={{ 
            color: 'green', // Change color as needed
            fontWeight: 'bold', // Make it bold
            fontSize: '1.5rem', // Adjust font size
            marginTop: '20px', // Add some space above
            textAlign: 'center' // Center the text
          }}  className='predicted-price'>
          Please enter a land size between 0 and 100000
        </Typography>
        )}
        

        {(price < 0 || price > 9000000) && (
          <Typography variant="h5" gutterBottom sx={{ 
            color: 'green', // Change color as needed
            fontWeight: 'bold', // Make it bold
            fontSize: '1.5rem', // Adjust font size
            marginTop: '20px', // Add some space above
            textAlign: 'center' // Center the text
          }}  className='predicted-price'>
          Please enter a price between 0 and 9000000
        </Typography>
        )}
        
      </Box>
    </Container>
  );
}

export default SuburbModel;