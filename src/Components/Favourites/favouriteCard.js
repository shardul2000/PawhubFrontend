import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import '../../css/listingCard.css';
import { ButtonBase } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Favourite from './favourites'


export default function FavouriteCard({listing}) {

  const [name, setName] = useState("");
  const [pic, setPic] = useState("");
  const [prop, setProp] = useState({}) ;
  const [listingData, setListingData]= useState({});


  //get listing posters data
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER}/api/profile/getInfoById/`+listing.listingPoster,{ headers: {
      "Content-Type":"application/json"
    }})
    .then((res) => {
        setName(res.data.response.firstName+" "+res.data.response.lastName);
        setPic(res.data.response.profileImage);
        setProp({
          name:res.data.response.firstName+" "+res.data.response.lastName,
          pic:res.data.response.profileImage,
          userId: res.data.response.userId
        })

    })
    .catch((e) => {
      console.log("Request failed : " + e);
    })
  },[]);


  //get listing data
    useEffect(() => {
      axios.get(`${process.env.REACT_APP_SERVER}/api/favourites/getListingDataById/`+listing.listingId,{ headers: {
        "Content-Type":"application/json"
      }})
      .then((res) => {
          setListingData(res.data.listings);
      })
      .catch((e) => {
        console.log("Request failed : " + e);
      })
    },[]);

  
  return (
  
     
  
    <Card sx={{width:'20rem', margin:2, padding:2, height:500}} className='cards'>
      <Link to={`/productDetails/${listing.listingId}`}
        state= {{
          poster : prop
        }}
      >
      <CardHeader
       
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={listingData.title}
        subheader={ new Date(listing.createdAt).toString().substring(0,15)}
      />
      <CardMedia
        component="img"
        height="194"
        image={listing.listingImage}
        alt="Paella dish"
      />
      <CardContent>
    
        <Typography variant="body2" color="text.secondary" sx={{marginTop:2}}>
           {listingData.description}
        </Typography>
      </CardContent>
      </Link>
      <CardActions disableSpacing>
          <Favourite clientId={localStorage.getItem("uid")} favListId={listing._id} listing ={listing}/>
        <IconButton aria-label="share">
          <EmailIcon />
        </IconButton>    
      </CardActions>
    </Card>

    
  );
}
