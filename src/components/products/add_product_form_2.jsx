import React, { Component } from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export class QuantityDetails extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { values, handleChange } = this.props;
    return (
        <>
            <AppBar title="Enter Quantity Details" />
            <TextField
              placeholder="Enter Remained Quantity"
              label="Quantity"
              onChange={handleChange('quantity')}
              defaultValue={values.quantity}
              margin="normal"
            />
            <br />
            <TextField
              placeholder="Enter Borrowed Count"
              label="Borrowed"
              onChange={handleChange('borrowed')}
              defaultValue={values.borrowed}
              margin="normal"
            />
            <br />

            <Button
              color="secondary"
              variant="contained"
              onClick={this.back}
            >Back</Button>

            <Button
              color="primary"
              variant="contained"
              onClick={this.continue}
            >Continue</Button>
        </>
    );
  }
}

export default QuantityDetails;