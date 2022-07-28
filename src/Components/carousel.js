import React from 'react';
import {
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBCarouselElement,
} from 'mdb-react-ui-kit';
import '../css/carousel.css';
import cover from '../Assets/2.png';
import cover2 from '../Assets/3.png';
import cover3 from '../Assets/4.png';
import cover4 from '../Assets/5.png';


export default function CCarousel() {
  return (
    <MDBCarousel showIndicators showControls fade className='carousel'>
      <MDBCarouselInner>
        <MDBCarouselItem className='active'>
          <MDBCarouselElement src={ cover }/>
        </MDBCarouselItem>

        <MDBCarouselItem>
          <MDBCarouselElement src={cover2} alt='...' />
        </MDBCarouselItem>

        <MDBCarouselItem>
          <MDBCarouselElement src={cover3}alt='...' />  
        </MDBCarouselItem>

        <MDBCarouselItem>
          <MDBCarouselElement src={cover4}alt='...' /> 
        </MDBCarouselItem>
      </MDBCarouselInner>
    </MDBCarousel>
  );
}