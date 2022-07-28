import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import '../../css/profile/post.css';
import axios from 'axios';
import { Rating, Typography } from '@mui/material';

export default function Reviews({reviews}){

    const [poster,setPoster]=useState("");

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_SERVER}/api/profile/getData/`+reviews.reviewerId,{ headers: {
			"Content-Type":"application/json",
			Authorization: localStorage.getItem("jwtToken")
		}})
		.then((res)=>{
			setPoster(res.data.response.firstName + " " + res.data.response.lastName)
		})
		.catch((e)=>{
			console.log(e);
		});
    },[])

    return(

        <div className="p-4 mt-3">
            <Typography variant='p' component='div' sx={{marginBottom:2}}>
            {reviews.review}
            </Typography>
            <Rating name="read-only" value={reviews.rating} readOnly />   
            <Typography variant='h6' component='div' sx={{marginTop:4}}>
                {poster}
            </Typography> 
            <hr />   
        </div>
    )
}