import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 768,
      md: 1366,
      lg: 1920,
      xl: 2560,
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    background: {
      default: "#25292e",
    },
    primary: {
      main: "#FFFFFF",
      text: "rgba(255, 255, 255, 0.6)",
      back: "rgba(255, 255, 255, 0.03)",
    },
    secondary: {
      main: "#35AC7A",
      contrastText: "#FFFFFF",
    },
    action: {
      disabledBackground: "#272727",
      disabled: "#FFFFFF",
    },
  },

  typography: {
    fontFamily: "Inter",
    fontWeightMedium: 400,
    h1: {
      fontSize: 100,
      [theme.breakpoints.down("lg")]: {
        fontSize: 80,
      },
      [theme.breakpoints.down("md")]: {
        fontSize: 60,
      },
      [theme.breakpoints.down("sm")]: {
        fontSize: 40,
      },
    },
    h2: {
      fontSize: 60,
      [theme.breakpoints.down("lg")]: {
        fontSize: 40,
      },
      [theme.breakpoints.down("md")]: {
        fontSize: 30,
      },
      [theme.breakpoints.down("sm")]: {
        fontSize: 20,
      },
    },
  },
});
