import { createTheme } from '@mui/material/styles';

// px 转 rem 的辅助函数（基准 75px = 1rem）
const pxToRem = (px: number): string => `${px / 75}rem`;

export const theme = createTheme({
  palette: {
    primary: {
      main: '#1890ff',
    },
    secondary: {
      main: '#722ed1',
    },
    background: {
      default: '#fafafa',
      paper: '#ffffff',
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
    ].join(','),
    // 设置基础 font-size 为 rem
    htmlFontSize: 75,
    h1: {
      fontSize: pxToRem(32),
    },
    h2: {
      fontSize: pxToRem(28),
    },
    h3: {
      fontSize: pxToRem(24),
    },
    h4: {
      fontSize: pxToRem(22),
    },
    h5: {
      fontSize: pxToRem(20),
    },
    h6: {
      fontSize: pxToRem(18),
    },
    body1: {
      fontSize: pxToRem(16),
    },
    body2: {
      fontSize: pxToRem(14),
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  spacing: (factor: number) => pxToRem(8 * factor), // MUI 的 spacing 函数
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          padding: pxToRem(10) + ' ' + pxToRem(16),
          fontSize: pxToRem(14),
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: 'var(--primary-background)',
          borderRadius: pxToRem(4),
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          backgroundColor: 'var(--primary-background)',
        },
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: 'lg',
      },
      styleOverrides: {
        root: {
          paddingLeft: pxToRem(16),
          paddingRight: pxToRem(16),
        },
      },
    },
  },
});
