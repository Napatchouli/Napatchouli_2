'use client';

import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import CardHeader from "@mui/material/CardHeader";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

interface DoseEntry {
  dosage: number;
  timesPerDay: number;
  daysOfWeek: string[];
}

export default function WeeklyDoseCalculator() {
  const [entries, setEntries] = useState<DoseEntry[]>([]);
  const [dosage, setDosage] = useState<number>(3);
  const [timesPerDay, setTimesPerDay] = useState<number>();
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const handleAddEntry = () => {
    if (selectedDays.length === 0) return;
    
    const newEntry: DoseEntry = {
      dosage,
      timesPerDay: timesPerDay || 0,
      daysOfWeek: [...selectedDays]
    };
    
    setEntries([...entries, newEntry]);
    setSelectedDays([]);
  };

  const calculateTotalDose = () => {
    return entries.reduce((total, entry) => {
      return total + (entry.dosage * entry.timesPerDay * entry.daysOfWeek.length);
    }, 0);
  };

  const handleDayToggle = (day: string) => {
    setSelectedDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  const handleSelectAllDays = () => {
    setSelectedDays(selectedDays.length === daysOfWeek.length ? [] : [...daysOfWeek]);
  };

  const handleReset = () => {
    setEntries([]);
    setSelectedDays([]);
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
        title="Weekly Dose Calculator" 
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
        <Stack spacing={2}>
          <FormControl fullWidth>
            <InputLabel>Dosage</InputLabel>
            <Select
              value={dosage}
              label="Dosage"
              onChange={(e) => setDosage(Number(e.target.value))}
            >
              {[1, 2, 3, 4, 5].map(value => (
                <MenuItem key={value} value={value}>{value} mg</MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            type="number"
            label="Times per Day"
            value={timesPerDay}
            onChange={(e) => {
              const value = e.target.value;
              if (/^[0-9]*\.?[0-9]*$/.test(value)) {
                const numValue = parseFloat(value) || 0.25;
                setTimesPerDay(Math.max(0.25, Math.min(10, numValue)));
              }
            }}
            fullWidth
          />

          <FormControl component="fieldset">
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={selectedDays.length === daysOfWeek.length}
                    onChange={handleSelectAllDays}
                  />
                }
                label="Select All"
              />
              {daysOfWeek.map(day => (
                <FormControlLabel
                  key={day}
                  control={
                    <Checkbox 
                      checked={selectedDays.includes(day)}
                      onChange={() => handleDayToggle(day)}
                    />
                  }
                  label={day}
                />
              ))}
            </FormGroup>
          </FormControl>

          <Button 
            variant="contained"
            onClick={handleAddEntry}
            disabled={selectedDays.length === 0}
            sx={{
              backgroundColor: '#1976d2',
              '&:hover': {
                backgroundColor: '#1565c0'
              }
            }}
          >
            Add Entry
          </Button>

          <Button 
            variant="outlined"
            onClick={handleReset}
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

          {entries.map((entry, index) => (
            <Card key={index} variant="outlined" sx={{ p: 1 }}>
              <Typography>
                Warfarin {entry.dosage} mg : {entry.timesPerDay} tabs/day × {entry.daysOfWeek.length} days
                ({entry.daysOfWeek.join(', ')})
              </Typography>
            </Card>
          ))}

          {entries.length > 0 && (
            <Typography variant="h6" sx={{ textAlign: 'center', mt: 2 }}>
              Total Weekly Dose: {calculateTotalDose()} mg
            </Typography>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
