'use client';

import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import CalculateIcon from '@mui/icons-material/Calculate';
import MedicationIcon from '@mui/icons-material/Medication';
import SearchIcon from '@mui/icons-material/Search';
import INRCalculator from './INRCalculator';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import TWD from './TWD';
import DoseDesign from './DoseDesign';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`calculator-tabpanel-${index}`}
      aria-labelledby={`calculator-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function CalculatorTabs() {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ 
      width: '100%',
      maxWidth: { xs: '100%', sm: '600px', md: '800px' },
      margin: 'auto',
      px: { xs: 1, sm: 2, md: 3 }
    }}>
      <Box sx={{ 
        borderBottom: 1, 
        borderColor: 'divider',
        overflowX: 'auto',
        '&::-webkit-scrollbar': {
          display: 'none'
        }
      }}>
        <Tabs 
          value={value} 
          onChange={handleChange}
          aria-label="calculator tabs"
          variant={isMobile ? "scrollable" : "fullWidth"}
          scrollButtons={isMobile ? "auto" : false}
          allowScrollButtonsMobile
          sx={{
            minHeight: { xs: '48px', sm: '64px' },
            '& .MuiTab-root': {
              fontSize: { xs: '0.875rem', sm: '1rem' },
              textTransform: 'none',
              fontWeight: 'bold',
              minWidth: { xs: 'auto', sm: '160px' },
              px: { xs: 1, sm: 2 },
            },
            '& .Mui-selected': {
              color: '#1976d2',
              '& .MuiSvgIcon-root': {
                color: '#1976d2',
              },
            },
          }}
        >
          <Tab 
            icon={<CalculateIcon />} 
            label={isMobile ? "INR" : "INR Calculator"} 
            iconPosition="start"
          />
          <Tab 
            icon={<MedicationIcon />} 
            label={isMobile ? "Weekly Dose" : "Total Weekly Dose"} 
            iconPosition="start"
          />
          <Tab 
            icon={<SearchIcon />} 
            label={isMobile ? "Dose Search" : "Dose Design Search"} 
            iconPosition="start"
          />
          <Tab 
            icon={<SearchIcon />} 
            label={isMobile ? "Follow-up" : "Follow-up Calculator"} 
            iconPosition="start"
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <INRCalculator />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Box sx={{ textAlign: 'center', py: { xs: 2, sm: 4 } }}>
          <TWD/>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Box sx={{ textAlign: 'center', py: { xs: 2, sm: 4 } }}>
          <DoseDesign/>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Box sx={{ textAlign: 'center', py: { xs: 2, sm: 4 } }}>
          <h2>Follow-up Calculator</h2>
          {/* Add your Follow-up Calculator component here */}
        </Box>
      </TabPanel>
    </Box>
  );
} 