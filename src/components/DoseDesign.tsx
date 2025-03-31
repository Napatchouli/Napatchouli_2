import React, { useState, useEffect } from 'react';
import WarfairnRegimens from './DoseDataBase';
import { 
  Alert as MuiAlert, 
  CardHeader, 
  Card, 
  CardContent, 
  CardActions, 
  Button, 
  TextField, 
  Typography, 
  Stack,
  Container,
  useTheme,
  useMediaQuery
} from '@mui/material';

interface DoseResult {
  twd: string;
  warfarin3mg: string;
  warfarin5mg: string;
}

export default function DoseDesign() {
  const [twd, setTWD] = useState<string>('');
  const [result, setResult] = useState<DoseResult | null>(null);
  const [error, setError] = useState<string>('');
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  // Input validation
  const handleTWDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || (Number(value) >= 0 && Number(value) <= 1000)) {
      setTWD(value);
      setError('');
    } else {
      setError('Please enter a valid dose between 0 and 1000 mg/wk');
    }
  };

  const searchTWD = () => {
    if (!twd || isNaN(Number(twd))) {
      setError('Please enter a valid number');
      setResult(null);
      return;
    }

    try {
      const regimens = WarfairnRegimens.rawData;
      const twdNumber = Number(twd);
      
      // Find exact match
      const foundRegimen = regimens.find((regimen, index) => 
        index > 0 && Number(regimen[0]) === twdNumber
      );
      
      if (foundRegimen) {
        setResult({
          twd: String(foundRegimen[0]),
          warfarin3mg: String(foundRegimen[1]),
          warfarin5mg: String(foundRegimen[2])
        });
        setError('');
      } else {
        setResult(null);
        setError('No regimen found for the specified TWD value');
      }
    } catch (err) {
      setError('An error occurred while searching. Please try again.');
      setResult(null);
    }
  };

  const handleReset = () => {
    setTWD('');
    setResult(null);
    setError('');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack 
        spacing={3} 
        sx={{ 
          maxWidth: isTablet ? '100%' : 500,
          margin: 'auto',
          px: isMobile ? 2 : 0
        }}
      >
        <Card
          sx={{
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
            title="Dose Design Search" 
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: 'white',
              '& .MuiTypography-root': {
                fontSize: isMobile ? '1.2rem' : '1.5rem',
                fontWeight: 'bold',
                textAlign: 'center'
              }
            }}
          />    
          <CardContent sx={{ padding: isMobile ? 2 : 3 }}>
            <TextField 
              label="Dose (mg/wk)" 
              id="Dose_Value"
              value={twd}
              onChange={handleTWDChange}
              type="number"
              fullWidth
              error={!!error}
              helperText={error}
              InputProps={{
                inputProps: { 
                  min: 0,
                  max: 1000,
                  'aria-label': 'Dose value input'
                }
              }}
              sx={{ mb: 2 }}
            />
            <CardActions 
              sx={{ 
                padding: isMobile ? 1 : 2, 
                gap: 1,
                flexDirection: isMobile ? 'column' : 'row'
              }}
            >
              <Button 
                variant="contained" 
                id="SearchTWD_Button"
                size={isMobile ? 'medium' : 'large'}
                fullWidth
                onClick={searchTWD}
                disabled={!!error}
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  '&:hover': {
                    backgroundColor: theme.palette.primary.dark
                  }
                }}
              >
                Search
              </Button>
              <Button 
                variant="outlined" 
                id="ResetTWD_Button"
                size={isMobile ? 'medium' : 'large'}
                fullWidth
                onClick={handleReset}
                sx={{
                  borderColor: theme.palette.primary.main,
                  color: theme.palette.primary.main,
                  '&:hover': {
                    borderColor: theme.palette.primary.dark,
                    backgroundColor: 'rgba(25, 118, 210, 0.04)'
                  }
                }}
              >
                Reset
              </Button>
            </CardActions>
          </CardContent>
        </Card>

        {result && (
          <Card 
            sx={{ 
              padding: isMobile ? 2 : 3,
              backgroundColor: theme.palette.grey[50]
            }}
          >
            <Stack spacing={2}>
              <Typography 
                variant={isMobile ? "h6" : "h5"} 
                color="primary"
                align="center"
              >
                TWD: {result.twd} mg/wk
              </Typography>
              <div>
                <Typography 
                  variant="subtitle1" 
                  color="primary" 
                  gutterBottom
                >
                  Warfarin 3 mg:
                </Typography>
                <Typography variant="body1">
                  {result.warfarin3mg || 'N/A'}
                </Typography>
              </div>
              <div>
                <Typography 
                  variant="subtitle1" 
                  color="primary" 
                  gutterBottom
                >
                  Warfarin 5 mg:
                </Typography>
                <Typography variant="body1">
                  {result.warfarin5mg || 'N/A'}
                </Typography>
              </div>
            </Stack>
          </Card>
        )}

        {error && (
          <MuiAlert 
            severity="error" 
            sx={{ 
              width: '100%',
              '& .MuiAlert-message': {
                width: '100%'
              }
            }}
          >
            {error}
          </MuiAlert>
        )}
      </Stack>
    </Container>
  );
}