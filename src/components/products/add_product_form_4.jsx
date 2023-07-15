import React, { Component } from 'react';
import Dialog from '@mui/material/Dialog';
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
    return (
        <>
            <AppBar title="Success" />
            <h1>Thank You For Your Submission</h1>
            <p>You will get an email with further instructions.</p>
            <br />

        <Link color="secondary" className="btn btn-info" href="/add-product"> Add Another Product </Link>
            &nbsp;
            <Link color="primary" className="btn btn-success" href="/products"> Go To Products </Link>
        </>
    );
  }
}

export default Success;