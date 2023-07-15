import React, { Component } from 'react';
import Dialog from '@mui/material/Dialog';
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
    return (
        <>
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
              color="primary"
              variant="contained"
              onClick={this.continue}
            >Continue</Button>
        </>
    );
  }
}

export default GeneralDetails;