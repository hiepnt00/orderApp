import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#66bb6a',
      dark: '#4fa24f',
      light: '#8ee08a',
    },
    background: {
      default: '#0b0f13',
      paper: '#282a33ff',
    },
    text: {
      primary: '#eaeaea',
      secondary: '#bdbdbd',
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: `'Inter', system-ui, -apple-system, BlinkMacSystemFont`,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(180deg, rgba(58, 61, 66, 0.95), rgba(36, 40, 46, 0.92))',
          color: '#eaeaea',
          boxShadow: '0 4px 18px rgba(0,0,0,0.6)',
          borderBottom: '1px solid rgba(255,255,255,0.04)',
          backdropFilter: 'blur(6px)',
          borderRadius: 0,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 999,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
});

export default theme
