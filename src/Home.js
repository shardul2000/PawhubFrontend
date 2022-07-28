import Navbar from "./Components/Navbar";
import CCarousel from "./Components/carousel";
import Footer from "./Components/Footer";
import './css/home.css';
import CarouselHome from "./Components/carouselHome";
import { useEffect } from "react";
export default function Home(){

    useEffect(() => {
        alert(process.env.REACT_APP_SERVER)
        
        
    }, []);
    return(
        <div className="contnr">    
        <Navbar />
        <CCarousel />   
        <div className="container">
            <hr className="hrs" />
        </div> 
        <CarouselHome />         
        <Footer />
        </div>

      
        
            
            
            
    )
}