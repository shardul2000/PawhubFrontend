
import React from 'react';
import {
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBCarouselElement,
  MDBCarouselCaption,
} from 'mdb-react-ui-kit';
import '../css/home.css';
import cover from '../Assets/signup2.png';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';


export default function CarouselHome() {
  return (
    <div className='imgcont'>
   <MDBCarousel >
      <MDBCarouselInner>
        <MDBCarouselItem className='active'>
          <MDBCarouselElement src={ cover } />
          <Link to="/register"><Button variant="contained"className="btns"><strong>Register</strong></Button></Link>
          </MDBCarouselItem>
      </MDBCarouselInner>
    </MDBCarousel>
    </div>
 
  );
}