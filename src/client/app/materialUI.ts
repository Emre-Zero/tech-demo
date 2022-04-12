import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material';

const materialTheme = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#301b3b',
    },
  },
  sidebarWidth: 240
} as const;

// Make Typescript happy without making me sad
// https://dragoshmocrii.com/material-ui-custom-theme-and-typescript/
type CustomTheme = {
  [Key in keyof typeof materialTheme]: typeof materialTheme[Key]
}
declare module '@mui/material/styles/createTheme' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  interface Theme extends CustomTheme { }
  interface ThemeOptions extends CustomTheme { }
}

export default createTheme(materialTheme);
