import React from 'react';
import {
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBCarouselElement
} from 'mdb-react-ui-kit';
import '../css/Marketcarousel.css';
import cover from '../Assets/pet.jpg';



export default function CarouselMarket() {
  return (
    <MDBCarousel showIndicators showControls fade className='carousel car'>
      <MDBCarouselInner>
        <MDBCarouselItem className='active'>
          <MDBCarouselElement src={ cover }/>
        </MDBCarouselItem>

        <MDBCarouselItem>
          <MDBCarouselElement src={cover} alt='...' />
        </MDBCarouselItem>

        <MDBCarouselItem>
          <MDBCarouselElement src={cover}alt='...' />  
        </MDBCarouselItem>

      </MDBCarouselInner>
    </MDBCarousel>
  );
}