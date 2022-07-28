
import React from "react";
import Navbar from "./Components/Navbar";
import SendTextCard from "./Components/sendTextCard";
import './css/carousel.css';
import { Grid, Typography } from "@mui/material";
import ProductDetailsCard from "./Components/productDetailsCard";
import Footer from "./Components/Footer";
import CarouselMarket from "./Components/carouselMarket";
import {useLocation, useParams} from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ProductDetails(){

    const location = useLocation();
    const { id }= useParams();
    const { state } = location;
    const[data, setData] = useState({});

    useEffect(() => {

        axios.get(`${process.env.REACT_APP_SERVER}/api/market/getListing/${id}`,{ headers: {
            "Content-Type":"application/json"
        }})
        .then((res) => {
           setData(res.data.post);
        })
        .catch((e) => {
          console.log("Request failed : " + e);
        })


    }, []);

    return(
        <div>
            <Navbar />
             <div className="container">
                <CarouselMarket />
                <Grid container>            
                   <Grid item xs={12} sm={12} md={4} lg={4} spacing={2}>
                        <div className="cards">
                              <SendTextCard poster={state.poster} />
                        </div>
                   </Grid>
                   <Grid item xs={12} sm={12} md={8} lg={8} spacing={2}>
                       <div className="cards">
                          <ProductDetailsCard details={data}/>
                       </div>
                       <div className="container descr" >
                          <Typography variant="h5">{data.description}</Typography>
                       </div>
                   </Grid>        
               </Grid>
            </div>
            <Footer />
        </div>
    );






}