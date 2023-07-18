import React, { Component } from 'react';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppBar from '@mui/material/AppBar';
import Link from '@mui/material/Link';

export class Success extends Component {
  continue = e => {
    e.preventDefault();
    // PROCESS FORM //
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    
     const theme = createTheme({
        palette: {
        },
        typography: {
            fontFamily: [
                "NotoSans",
                "NotoSansThai",
                "Arial",
                "Roboto",
                "'Helvetica Neue'",
                "sans-serif",
            ].join(","),
        },
        shape: {
            borderRadius: 15,
        },
    });
    
     return (
        <>
        <ThemeProvider theme={theme}>
            <AppBar title="Success" />
            <h1>Thank You For Your Submission</h1>
            <p>You will get an email with further instructions.</p>
            <br />

        <Link className="btn btn-info" href="/add-product"> Add Another Product </Link>
            &nbsp;
            <Link className="btn btn-success" href="/products"> Go To Products </Link>
        </ThemeProvider>
        </>
    );
  }
}

export default Success;