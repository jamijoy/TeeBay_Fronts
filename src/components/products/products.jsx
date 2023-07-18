import '../../App.css';
import '../../teebay.css';

import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import DataTable from 'react-data-table-component';
import Link from '@mui/material/Link';
import axios from 'axios';
import Cookies from "universal-cookie";

import { createStyles, Header, Container, Title, Text, Group, Burger, Button, rem, Paper, PaperProps, Stack, TextInput, PasswordInput, Grid, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import  QueueIcon from '@mui/icons-material/Queue';


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

    
export const Products = () => {
   
const [opened, { toggle }] = useDisclosure(false);
const { classes, cx } = useStyles();
    
const [products, setProducts] = useState({});
const [page, setPage] = useState(1);
const countPerPage = 10;

const navigate = useNavigate();
const cookies = new Cookies();
const [token, setToken] = useState(null);

if (!cookies.get("token")) {
    navigate('/');
}else{
    console.log('Cookie >> Token >>  '+ cookies.get("token"));
}
 
function logoutUser(){                  
    /*
     *  TODO: Need to handle in different architecture 
     * 
     */
    setToken(null);
    cookies.remove("token");
    navigate('/');
}
                    
  function actionOnProduct(id,action){                  
    /*
     *  TODO: Axios will be shift under /action folder 
     * 
     */
    axios.get(`http://localhost:8080/buyProduct/`+action+`/`+id)
            .then(axiosResponse => {
                    console.log('Product Action -::-  Area');
                    const data = JSON.parse(axiosResponse.request.response);
                    let responseMessage = JSON.stringify(data.message);
                    console.log('Product Buy -::- '+ responseMessage);

                    if(data.message === "success"){
                        
                        if(action==='buy'){
                            alert('Buy Successful..');
                        }else if(action==='add'){
                            alert('Addition Successful..');
                        }else if(action==='borrow'){
                            alert('Borrow action Successful..');
                        }                        
                        const localToken = localStorage.getItem("token");
                        console.log(localToken);
                        getProductList();
                        
                    }else{
                        alert('Action Declined..');
                    }
        }).catch(err => {
            setProducts({});
        });
  }
 
const columns = [
  {
    name: 'Product Name',
    selector: 'name',
    sortable: true
  },
  {
    name: 'Category',
    selector: 'category',
    sortable: false
  },
  {
    name: 'Current Stock',
    selector: 'quantity',
    sortable: false
  },
  {
    name: 'Borrowed',
    selector: 'borrowed',
    sortable: false
  },
  {
    name: 'User Services',
    cell: row =>    <>        <Button className="btn btn-warning" onClick={(e) => actionOnProduct(row.id,'buy')}> Buy </Button>
            &nbsp;&nbsp;    <Button className="btn btn-info" onClick={(e) => actionOnProduct(row.id,'add')}> Add </Button>
            &nbsp;&nbsp;    <Button className="btn btn-danger" onClick={(e) => actionOnProduct(row.id,'borrow')}> Borrow </Button></>,
  }
];
 
            
/*
 *  TODO: Axios will be shift under /action folder 
 * 
 */
                    
  const getProductList = () => {
    axios.get(`http://localhost:8080/products`).then(res => {
        console.log('.............XX......XX.................');
        console.log(res.data);
      setProducts(res.data);
    }).catch(err => {
      setProducts({});
    });
  }
 
  useEffect(() => {
      
    getProductList();
    
    
  }, [page]);
 
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
             <Grid.Col xs={1}></Grid.Col>
             <Grid.Col xs={10}>
                    <h3>TeeBay : List of products</h3>
                    <Button className="btn btn-danger" onClick={(e) => logoutUser()} >Log Out</Button> &nbsp; 
                    <NavLink component="a" label="Add Product" href="/add-product" icon={<QueueIcon size="1rem" stroke={1.5} />} />
                    <DataTable
                      title="Products"
                      columns={columns}
                      data={products.products}
                      highlightOnHover
                      pagination
                      paginationServer
                      paginationTotalRows={products.total}
                      paginationPerPage={countPerPage}
                      paginationComponentOptions={{
                        noRowsPerPage: true
                      }}
                      onChangePage={page => setPage(page)}
                    />
             </Grid.Col>
             <Grid.Col xs={1}></Grid.Col>
          </Grid>
 </>
             
           
  );
    
}