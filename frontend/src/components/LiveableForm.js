// src/components/LiveableForm.js
import React, { useState } from 'react';
import { TextField, Button, CircularProgress } from '@mui/material';

function LiveableForm({ onSubmit, loading }) {
  const [suburb, setSuburb] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(suburb); // Pass suburb to parent component's handler
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label="Enter Suburb"
        variant="outlined"
        value={suburb}
        onChange={(e) => setSuburb(e.target.value)}
        required
      />
      <Button 
        type="submit" 
        variant="contained" 
        color="primary" 
        fullWidth
        disabled={loading || !suburb.trim()}
        sx={{ mt: 2 }}
      >
        {loading ? <CircularProgress size={24} /> : 'Predict Liveable Area'}
      </Button>
    </form>
  );
}

export default LiveableForm;