import { createTheme } from '@mui/material';
import "@fontsource/poppins";

// MUI Theme instance
export const MuiTheme = createTheme({
    cssVariables: true,
    palette: {
        primary: {
            main: '#556cd6',
        },
        secondary: {
            main: '#19857b',
        },
        common: {
            black: "#000000",
            white: "#ffffff",
        }
    },
    typography: {
        allVariants: {
            fontFamily: "Poppins",
            textTransform: "none"
        },
        h5: {
            fontWeight: 700,
            fontSize: "20px",
            lineHeight: "24px"
        },
        // changed
        h4: {
            fontWeight: 700,
            fontSize: "20px",
            lineHeight: "30px"
        },
        body1: {
            fontWeight: 500,
            fontSize: "16px",
            lineHeight: "24px"
        },
        body2: {
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "21px"
        },
        caption: {
            fontWeight: 500,
            fontSize: "12px",
            lineHeight: "18px"
        },
        button: {
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "21px"
        },
        subtitle2: {
            fontWeight: 500,
            fontSize: "10px",
            lineHeight: "15px"
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: "10px",
                    boxShadow: "none",
                    textTransform: "none",
                    height: "40px"
                },
                contained: {
                    backgroundColor: "hsla(218, 97%, 51%, 0.1)",
                    color: "hsla(218, 97%, 51%, 1)"
                },
            }
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    fontWeight: 700,
                    fontSize: "16px",
                    lineHeight: "24px",
                    color: "black",
                    textTransform: "none",
                    transition: "0s",
                    flex: 1,
                    height: "70px",
                    borderBottom: "3px solid hsla(240, 7%, 92%, 1)",
                    "&.Mui-selected": {
                        color: "black",
                        BorderBottom: "none"
                    },
                },

            }
        },
        MuiTabs: {
            styleOverrides: {
                indicator: {
                    backgroundColor: "black",
                }
            }
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    backgroundColor: "hsla(0, 0%, 85%, 1)",
                    "& > .MuiChip-label": {
                        padding: "0 4px",
                        height: "15px",
                        lineHeight: "150%",
                        fontSize: "10px",
                        color: "white"
                    }
                }
            }
        }
    }


});