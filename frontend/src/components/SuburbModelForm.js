// src/components/SuburbModelForm.js
import React from 'react';
import { Grid, TextField, Button, CircularProgress } from '@mui/material';

function SuburbModelForm({ landSize, price, setLandSize, setPrice, handleSubmit, loading }) {
  
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="number"
            label="Land Size (m^2)"
            variant="outlined"
            value={landSize}
            onChange={(e) => setLandSize(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="number"
            label="Budget"
            variant="outlined"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Predict Ideal Suburbs'}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default SuburbModelForm;