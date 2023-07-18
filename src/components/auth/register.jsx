import '../../App.css';
import '../../teebay.css';

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Validation from "./RegisterValidation";
import axios from "axios";
import Cookies from "universal-cookie";
import { isExpired, decodeToken } from "react-jwt";
import jwt from "jwt-decode";

import { createStyles, Header, Container, Title, Text, Group, Burger, Button, rem, Paper, PaperProps, Stack, TextInput, PasswordInput, Grid, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";


/*
 *  TODO: Style propertises will be moved to new file
 * 
 */

const useStyles = createStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },

  links: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('xs')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },
}));

export const Register = (props) => {
    
    const [opened, { toggle }] = useDisclosure(false);
    const { classes, cx } = useStyles();
    
    const navigate = useNavigate();
    const cookies = new Cookies();
    
    const [token, setToken] = useState(null);
    
    const [values, setValues] = useState({
        name : '',
        email : '',
        password : ''
    })
    
    const [errors, setErrors] = useState({})
    
    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: event.target.value}))
    }

    const handleSubmit = (event) => {

        event.preventDefault();
        setErrors(Validation(values));
        
        if(errors.name==="" && errors.email==="" && errors.password===""){
            
            
            /*
             *  TODO: Axios will be shift under /action folder 
             * 
             */

            return axios({
                method: 'post',
                url: "http://localhost:8080/register",
                data: values,
                xsrfHeaderName: "csrftoken",
                responseType: 'json'
              })
                .then((axiosResponse) => {

                    const data = JSON.parse(axiosResponse.request.response);

                    if(data.message === "success"){
                        
                        // Printing response
                        console.log('registered in -::- '+ data.access_token);

                         // specify token from laravel given access token
                        const splited_token = data.access_token.split("|");
                        const decoded_token = decodeToken(splited_token[1]);
                        const isMyTokenExpired = isExpired(splited_token[1]);
                        
                        // token and cookie storing
                        setToken(splited_token[1]);                        
                        localStorage.setItem("token", splited_token[1]);
                        cookies.set("token", splited_token[1], { maxAge: 86400 });
                        
                        // set root URL to login if user logout in future and moving the user to products page
                        props.onFormSwitch('login');
                        navigate('/products');

                    }else{
                        alert('Cannot Register.. ');
                    }
                })
                .catch((response) => {
                    console.log(response.message);
                    alert('Wrong Credential.. '+ response.message);
                });

        }
    }
    
    return (
       
          <>
            <Header height={60} mb={120}>
            <Container className={classes.header}>
              <h1 className={classes.title}>
                {' '}
                <Text component="span" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }} inherit>
                  TeeBay
                </Text>{' '}
                an experimental project
              </h1>
              <Group spacing={5} className={classes.links}>
                
              </Group>

              <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />
            </Container>
          </Header>
          <Grid>
             <Grid.Col xs={4} align="center"></Grid.Col>
             <Grid.Col xs={4}>
                <Paper radius="md" p="xl" padd withBorder {...props}>
                       <form action="" onSubmit={handleSubmit}>
                         <Stack>
                           <TextInput
                             
                             label="Your Name"
                             placeholder="Enter a name"
                             id="name" 
                             name="name"
                             onChange={handleInput}
                             error={errors.name && <small className="text-danger">{errors.name}</small>}
                             radius="md"
                           />
                           <TextInput
                             
                             label="Email"
                             placeholder="jamijoyy@gmail.com"
                             id="email" 
                             name="email"
                             onChange={handleInput}
                             error={errors.email && <small className="text-danger">{errors.email}</small>}
                             radius="md"
                           />
                           <PasswordInput
                             
                             label="Password"
                             placeholder="Your password"
                             radius="md"
                             id="password" 
                             name="password"
                             onChange={handleInput}
                             error={errors.password && <small className="text-danger">{errors.password}</small>}
                           />
                         </Stack>
                        
                         <Group position="apart" mt="xl">
                            <button className="btn btn-info" type="submit">Register</button>
                            <button onClick={() => props.onFormSwitch('login')} rel="noopener noreferrer"> Already Registered ? Sign in.</button>
                         </Group>
                       </form>
                     </Paper>
               </Grid.Col>
             <Grid.Col xs={4}></Grid.Col>
            </Grid>
       
          </>
      
    )
}