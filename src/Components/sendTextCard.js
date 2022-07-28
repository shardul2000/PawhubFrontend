import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import '../css/productDetails.css';
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import ReportButton from './Report/ReportButton';
const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );

export default function SendTextCard({poster}){
    return (
        <Card sx={{  padding:1, marginTop:4}}>
             <Typography variant='h5' component="div">
                  Contact
              </Typography>
        
           <Link to={`/viewprofile/${poster.userId}`} className='linkContact'>
             <Avatar sx={{ bgcolor: red[500], height: '3em', width:'3em'}} aria-label="recipe" className='avatar' src= {poster.pic}>
               
             </Avatar>
             <Typography variant='h5' component="div">
               {poster.name}
             </Typography>
            </Link> 
          <CardContent>   
              <form>
                 <div className="mb-3">
                   
                 </div>
                 
                 <Link to="/message" >
                 <Button variant='contained' sx={{backgroundColor:'#3d5a80'}}>Send Message</Button>
                 </Link>
              </form>
           
          </CardContent>
          <ReportButton id="listing" />
        </Card>
      );
}