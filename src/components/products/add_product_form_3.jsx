import React, { Component } from 'react';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppBar from '@mui/material/AppBar';
import { List, ListItem, ListItemText } from '@mui/material';
import Button from '@mui/material/Button';
import axios from "axios";

export class ConfirmDetails extends Component {
  continue = e => {
    e.preventDefault();
    
    // PROCESSing SUBMISSION //
    
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
    
    const {
      values: { name, category, quantity, borrowed }
    } = this.props;
    
    const handleSubmit = (event) => {

        console.log(this.props.values);
        
        // PROCESSing SUBMISSION //
        
        if((this.props.values.name!=="" && this.props.values.category!=="") && this.props.values.quantity!==""){

              return axios({
                method: 'post',
                url: "http://localhost:8080/add-product",
                data: this.props.values,
                xsrfHeaderName: "csrftoken",
                responseType: 'json'
              })
                .then((axiosResponse) => {
                    
                    const data = JSON.parse(axiosResponse.request.response);

                    if(data.message === "success"){
                        
                        this.props.nextStep();
                    }else{
                        alert('wrong credential.. ');
                    }
                })
                .catch((response) => {
                  console.log(response.message);
                  alert('Wrong Credential.. '+ response.message);
               });
        }else{
            alert('Please fill out all the product information properly');
        }
        
    }
    
    return (
        <>
        <ThemeProvider theme={theme}>
            <AppBar title="Confirm Product Information" />
            <List>
              <ListItem>
                <ListItemText primary="Product Name" secondary={name} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Product Category" secondary={category} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Current Stock" secondary={quantity} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Borrowed Count" secondary={borrowed} />
              </ListItem>
            </List>
            <br />

            <Button
              color="secondary"
              variant="contained"
              onClick={this.back}
            >Back</Button>

            <Button
              variant="contained"
              onClick={handleSubmit}
            >Confirm & Continue</Button>
        </ThemeProvider>
        </>
    );
  }
}

export default ConfirmDetails;