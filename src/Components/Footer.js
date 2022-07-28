
import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBIcon,

} from 'mdb-react-ui-kit';
import '../css/footer.css';

export default function Footer() {
  return (
    <div>
    <MDBFooter className='text-center foot' color='white'>
      <MDBContainer className='p-4'>
        <section className='mb-4'>
          <a className='btn btn-outline-light btn-floating m-1' href='#!' role='button'>
            <MDBIcon fab icon='facebook-f' />
          </a>

          <a className='btn btn-outline-light btn-floating m-1' href='#!' role='button'>
            <MDBIcon fab icon='twitter' />
          </a>

          <a className='btn btn-outline-light btn-floating m-1' href='#!' role='button'>
            <MDBIcon fab icon='google' />
          </a>

          <a className='btn btn-outline-light btn-floating m-1' href='#!' role='button'>
            <MDBIcon fab icon='instagram' />
          </a>

          <a className='btn btn-outline-light btn-floating m-1' href='#!' role='button'>
            <MDBIcon fab icon='linkedin-in' />
          </a>

          <a className='btn btn-outline-light btn-floating m-1' href='#!' role='button'>
            <MDBIcon fab icon='github' />
          </a>
        </section>

        
      </MDBContainer>

      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
       <strong>© 2022 Copyright : </strong>  
       <strong>
         <a className='text-white' href='https://mdbootstrap.com/'>
          PawHub
        </a>
        </strong>
      </div>
    </MDBFooter>
    </div>
  );
}