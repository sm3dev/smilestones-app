import React from "react";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Smilestones } from "./components/Smilestones";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import "./styles/custom.scss";

const smileTheme = createTheme({
  palette: {
    primary: {
      main: "#3d5afe",
    },
    secondary: {
      main: "#fee13d",
    },
  },
  typography: {
    fontSize: 18,
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          fontWeight: "bold",
          fontSize: "4rem",
        },
      },
    },
  },
});

const rootElement = document.getElementById("root");

ReactDOM.render(
  <BrowserRouter>
    <Smilestones />
  </BrowserRouter>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
