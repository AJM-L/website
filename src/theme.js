import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark', // or 'dark'
    primary: {
      main: '#1976d2', // Matches --color-primary
    },
    secondary: {
      main: '#dc004e', // Matches --color-secondary
    },
    background: {
      default: '#000000', // Matches --color-background
    },
    text: {
      primary: '#f0f0f0', // Matches --color-text
      secondary: '#dddddd', // Matches --color-light-text
    },
  },
  typography: {
    h2: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
  },
});

export default theme; 