import React, { Component } from 'react';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppBar from '@mui/material/AppBar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export class GeneralDetails extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  render() {
    const { values, handleChange } = this.props;
    
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
            <AppBar title="Enter Product General Details" />
            <TextField
              placeholder="Enter Product Name"
              label="Product Name"
              onChange={handleChange('name')}
              defaultValue={values.name}
              margin="normal"
            />
            <br />
            <TextField
              placeholder="Enter Product Category"
              label="Product Category"
              onChange={handleChange('category')}
              defaultValue={values.category}
              margin="normal"
            />
            <br />
            <Button
              variant="contained"
              onClick={this.continue}
            >Continue</Button>
            </ThemeProvider>
        </>
    );
  }
}

export default GeneralDetails;