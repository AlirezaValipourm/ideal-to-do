import { createTheme } from '@mui/material';

// MUI Theme instance.
export const MuiTheme = createTheme({
    cssVariables: true,
    palette: {
        primary: {
            main: '#556cd6',
        },
        secondary: {
            main: '#19857b',
        },
        error: {
            main: "#fff",
        },
    },
    typography: {
        // fontFamily: roboto.style.fontFamily,
    },
});