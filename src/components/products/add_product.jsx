import React, { Component } from 'react';
import GeneralDetails from './add_product_form_1';
import QuantityDetails from './add_product_form_2';
import ConfirmDetails from './add_product_form_3';
import Success from './add_product_form_4';

export class AddProductForm extends Component {
  state = {
    step: 1,
    name: '',
    category: '',
    quantity: '',
    borrowed: ''
  };

  // Proceed to next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  // Go back to prev step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };

  // Handle fields change
  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };

  render() {
    const { step } = this.state;
    const { name, category, quantity, borrowed } = this.state;
    const values = { name, category, quantity, borrowed };

    switch (step) {
      case 1:
        return (
          <GeneralDetails
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 2:
        return (
          <QuantityDetails
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 3:
        return (
          <ConfirmDetails
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            values={values}
          />
        );
      case 4:
        return <Success />;
      default:
        (console.log('Prouct addition form unexpected state ..............................'))
    }
  }
}

export default AddProductForm;