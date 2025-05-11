import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#212121', // Dark gray / Almost black
    },
    secondary: {
      main: '#f5f5f5', // Light gray for backgrounds
    },
    text: {
      primary: '#212121', // Dark gray
      secondary: '#757575', // Medium gray
    },
    background: {
      default: '#ffffff', // White background
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h2: {
      fontWeight: 'bold',
    },
    h5: {
      marginBottom: '16px', // Equivalent to theme.spacing(2) if theme is available
    },
    button: {
      textTransform: 'none',
      fontWeight: 'bold',
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          color: '#ffffff',
        },
        outlinedPrimary: {
          borderColor: '#212121',
          color: '#212121',
          '&:hover': {
            backgroundColor: 'rgba(33, 33, 33, 0.04)', // Slight darken on hover for outlined
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        colorTransparent: {
          backgroundColor: '#ffffff', // White background for header
          boxShadow: 'none',
          borderBottom: '1px solid #e0e0e0',
        },
      },
    },
  },
});

export default theme; 