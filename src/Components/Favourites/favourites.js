import React, { useEffect, useState } from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from "axios";
import IconButton from '@mui/material/IconButton';

function Favourite({clientId, favListId, listing}) {

    const data = {
        listingId:favListId,
        clientId:clientId
    }
    const[change, setChange]=useState("");
    const [favId,setFavId]=useState("");

    const [isFav, setIsFav]=useState(null);
    useEffect(()=>{

        axios.post(`${process.env.REACT_APP_SERVER}/api/favourites/checkFavourite`,data,{ headers: {
            "Content-Type":"application/json",
            Authorization: localStorage.getItem("jwtToken")
        }})
        .then((res)=>{
            setIsFav(res.data.isFav);
        })
        .catch((e)=>alert(e));

    },[change]);


    //onclick to add post data to favourites db using
    const favouriteClick = (e) => {
		
        const data={
            listingId:favListId,
            clientId:clientId,
            listingImage:listing.image,
            listingDescription:listing.description,
            listingPoster:listing.userId
        }

        if(isFav){ 
            axios.post(`${process.env.REACT_APP_SERVER}/api/favourites/deleteFavourite`,data,{ headers: {
                "Content-Type":"application/json",
                Authorization: localStorage.getItem("jwtToken")
            }})
            .then(()=>{
                alert("Favourite Removed");
                setChange("changed");
                setIsFav(false);
            })
            .catch((e)=>alert(e));
        }else{
            axios.post(`${process.env.REACT_APP_SERVER}/api/favourites/addFavourite`,data,{ headers: {
                "Content-Type":"application/json",
                Authorization: localStorage.getItem("jwtToken")
            }})
            .then((res)=>{
                setFavId(res.data.response);
                alert("Favourite Added");
                setChange("changed")
            })
            .catch((e)=>alert(e));
        }

	}

    //return addFavourite button 
    return (
        <>
        { 
            isFav ?
        (
            <IconButton aria-label="add to favorites" onClick={favouriteClick}>
			<FavoriteIcon sx={{color:'red'}} />
		   </IconButton>
        )
        :
        (
            <IconButton aria-label="add to favorites" onClick={favouriteClick}>
            <FavoriteIcon />
            </IconButton>
        )
        }
        </>
    )
}

export default Favourite