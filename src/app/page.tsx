import styles from "./page.module.css";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CalculatorTabs from '@/components/CalculatorTabs';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Typography 
          variant="h3" 
          component="h1" 
          sx={{ 
            color: '#1976d2',
            fontWeight: 'bold',
            mb: 4
          }}
        >
          Warfarin Calculator
        </Typography>
        <Box sx={{ width: '100%', maxWidth: 800, margin: 'auto' }}>
          <CalculatorTabs />
        </Box>
      </main>
    </div>
  );
}
