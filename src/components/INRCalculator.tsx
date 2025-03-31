'use client';

import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CardHeader from "@mui/material/CardHeader";

export default function INRCalculator() {
  const calculate = () => {
    console.log("calculate");
  };

  const reset = () => {
    console.log("reset");
  };

  return (
    <Card 
      sx={{
        maxWidth: 400,
        margin: 'auto',
        backgroundColor: '#ffffff',
        borderRadius: 2,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        '&:hover': {
          boxShadow: '0 8px 12px rgba(0, 0, 0, 0.15)',
          transform: 'translateY(-2px)',
          transition: 'all 0.3s ease-in-out'
        }
      }}
    >
      <CardHeader 
        title="INR Calculator" 
        sx={{
          backgroundColor: '#1976d2',
          color: 'white',
          '& .MuiTypography-root': {
            fontSize: '1.5rem',
            fontWeight: 'bold'
          }
        }}
      />    
      <CardContent sx={{ padding: 3 }}>
        <TextField 
          label="INR" 
          id="INR_Value"
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField 
          label="Current Dose (mg/wk)" 
          id="Current_Dose"
          fullWidth
          sx={{ mb: 2 }}
        />
        <CardActions sx={{ padding: 2, gap: 1 }}>
        <Button 
          variant="contained" 
          id="Calculate_Button"
          size='large'
          fullWidth
          onClick={calculate}
          sx={{
            backgroundColor: '#1976d2',
            '&:hover': {
              backgroundColor: '#1565c0'
            }
          }}
        >
          Calculate
        </Button>
        <Button 
          variant="outlined" 
          id="Reset_Button"
          fullWidth
          size='large'
          onClick={reset}
          sx={{
            borderColor: '#1976d2',
            color: '#1976d2',
            '&:hover': {
              borderColor: '#1565c0',
              backgroundColor: 'rgba(25, 118, 210, 0.04)'
            }
          }}
        >
          Reset
        </Button>
      </CardActions>
      </CardContent>
      
    </Card>
  );
} 