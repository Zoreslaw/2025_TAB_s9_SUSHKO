import { createTheme, alpha } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
  }
  interface PaletteOptions {
    neutral?: PaletteOptions['primary'];
  }
}

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#fff',
    },
    secondary: {
      main: '#9c27b0',
      light: '#ba68c8',
      dark: '#7b1fa2',
      contrastText: '#fff',
    },
    error: {
      main: '#d32f2f',
      light: '#ef5350',
      dark: '#c62828',
    },
    warning: {
      main: '#ed6c02',
      light: '#ff9800',
      dark: '#e65100',
    },
    info: {
      main: '#0288d1',
      light: '#03a9f4',
      dark: '#01579b',
    },
    success: {
      main: '#2e7d32',
      light: '#4caf50',
      dark: '#1b5e20',
    },
    neutral: {
      main: '#64748B',
      light: '#94A3B8',
      dark: '#334155',
      contrastText: '#fff',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#334155',
      secondary: '#64748B',
      disabled: '#94A3B8',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
      letterSpacing: '-0.01562em',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.2,
      letterSpacing: '-0.00833em',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
      lineHeight: 1.2,
      letterSpacing: '0em',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.2,
      letterSpacing: '0.00735em',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.2,
      letterSpacing: '0em',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.2,
      letterSpacing: '0.0075em',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0px 2px 1px -1px rgba(0,0,0,0.08),0px 1px 1px 0px rgba(0,0,0,0.06),0px 1px 3px 0px rgba(0,0,0,0.04)',
    '0px 3px 1px -2px rgba(0,0,0,0.08),0px 2px 2px 0px rgba(0,0,0,0.06),0px 1px 5px 0px rgba(0,0,0,0.04)',
    '0px 3px 3px -2px rgba(0,0,0,0.08),0px 3px 4px 0px rgba(0,0,0,0.06),0px 1px 8px 0px rgba(0,0,0,0.04)',
    '0px 2px 4px -1px rgba(0,0,0,0.08),0px 4px 5px 0px rgba(0,0,0,0.06),0px 1px 10px 0px rgba(0,0,0,0.04)',
    '0px 3px 5px -1px rgba(0,0,0,0.08),0px 5px 8px 0px rgba(0,0,0,0.06),0px 1px 14px 0px rgba(0,0,0,0.04)',
    '0px 3px 5px -1px rgba(0,0,0,0.08),0px 6px 10px 0px rgba(0,0,0,0.06),0px 1px 18px 0px rgba(0,0,0,0.04)',
    '0px 4px 5px -2px rgba(0,0,0,0.08),0px 7px 10px 1px rgba(0,0,0,0.06),0px 2px 16px 1px rgba(0,0,0,0.04)',
    '0px 5px 5px -3px rgba(0,0,0,0.08),0px 8px 10px 1px rgba(0,0,0,0.06),0px 3px 14px 2px rgba(0,0,0,0.04)',
    '0px 5px 6px -3px rgba(0,0,0,0.08),0px 9px 12px 1px rgba(0,0,0,0.06),0px 3px 16px 2px rgba(0,0,0,0.04)',
    '0px 6px 6px -3px rgba(0,0,0,0.08),0px 10px 14px 1px rgba(0,0,0,0.06),0px 4px 18px 3px rgba(0,0,0,0.04)',
    '0px 6px 7px -4px rgba(0,0,0,0.08),0px 11px 15px 1px rgba(0,0,0,0.06),0px 4px 20px 3px rgba(0,0,0,0.04)',
    '0px 7px 8px -4px rgba(0,0,0,0.08),0px 12px 17px 2px rgba(0,0,0,0.06),0px 5px 22px 4px rgba(0,0,0,0.04)',
    '0px 7px 8px -4px rgba(0,0,0,0.08),0px 13px 19px 2px rgba(0,0,0,0.06),0px 5px 24px 4px rgba(0,0,0,0.04)',
    '0px 7px 9px -4px rgba(0,0,0,0.08),0px 14px 21px 2px rgba(0,0,0,0.06),0px 5px 26px 4px rgba(0,0,0,0.04)',
    '0px 8px 9px -5px rgba(0,0,0,0.08),0px 15px 22px 2px rgba(0,0,0,0.06),0px 6px 28px 5px rgba(0,0,0,0.04)',
    '0px 8px 10px -5px rgba(0,0,0,0.08),0px 16px 24px 2px rgba(0,0,0,0.06),0px 6px 30px 5px rgba(0,0,0,0.04)',
    '0px 8px 11px -5px rgba(0,0,0,0.08),0px 17px 26px 2px rgba(0,0,0,0.06),0px 6px 32px 5px rgba(0,0,0,0.04)',
    '0px 9px 11px -5px rgba(0,0,0,0.08),0px 18px 28px 2px rgba(0,0,0,0.06),0px 7px 34px 6px rgba(0,0,0,0.04)',
    '0px 9px 12px -6px rgba(0,0,0,0.08),0px 19px 29px 2px rgba(0,0,0,0.06),0px 7px 36px 6px rgba(0,0,0,0.04)',
    '0px 10px 13px -6px rgba(0,0,0,0.08),0px 20px 31px 3px rgba(0,0,0,0.06),0px 8px 38px 7px rgba(0,0,0,0.04)',
    '0px 10px 13px -6px rgba(0,0,0,0.08),0px 21px 33px 3px rgba(0,0,0,0.06),0px 8px 40px 7px rgba(0,0,0,0.04)',
    '0px 10px 14px -6px rgba(0,0,0,0.08),0px 22px 35px 3px rgba(0,0,0,0.06),0px 8px 42px 7px rgba(0,0,0,0.04)',
    '0px 11px 14px -7px rgba(0,0,0,0.08),0px 23px 36px 3px rgba(0,0,0,0.06),0px 9px 44px 8px rgba(0,0,0,0.04)',
    '0px 11px 15px -7px rgba(0,0,0,0.08),0px 24px 38px 3px rgba(0,0,0,0.06),0px 9px 46px 8px rgba(0,0,0,0.04)'
  ],
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 8px 40px -12px rgba(0,0,0,0.1)',
          '&:hover': {
            boxShadow: '0 16px 70px -12.125px rgba(0,0,0,0.15)',
            transition: '0.3s',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          },
        },
        contained: {
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        rounded: {
          borderRadius: 12,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 600,
          color: '#fff',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:last-child td': {
            borderBottom: 0,
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          overflow: 'hidden',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

export default theme;