// src/components/MaximumPriceForm.js
import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

function MaximumPriceForm({ onSubmit }) {
  const [distance, setDistance] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(distance); // Pass distance to parent component's handler
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label="Enter Distance from CBD"
        type="number"
        value={distance}
        onChange={(e) => setDistance(e.target.value)}
        required
      />
      <Button 
        type="submit" 
        variant="contained" 
        color="primary" 
        fullWidth
        sx={{ mt: 2 }}
      >
        Predict Price
      </Button>
    </form>
  );
}

export default MaximumPriceForm;