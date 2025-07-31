import React, { useState } from 'react';
import Dashbord from './Dashbord';
import './Home.css';
import { Link } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import makeup from '../page/makeup.jpeg'
import watches from '../page/watches.jpg';
import perfumes from '../page/perfumes.jpeg';
import clothes from '../page/clothes.jpg';
import sendal from '../page/sendal.jpg'
import women from '../page/women clothes.jpg'
import men from '../page/men clothes.jpg'
export default function Homeadmin() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const headings = [
        "Elegant Watches",
        "Stylish Clothing",
        "Luxury Perfumes",
        "Makeup Product",
        "Women Stylish Slipper",
        "Stylish Women Clothes",
        "Stylish Men Clothes"
    ];

    return (
        <>
            <Dashbord/>
            <section>
                <div className="home text-center p-5">
                    <h1 className="display-5 fw-bold mb-3 text-white">Welcome to ShopSmart</h1>
                    <div className="mb-4 text-white">
                        Easily manage your products, showcase them beautifully, and <br />
                        grow your business with our simple and powerful product management system.
                    </div>
                    <Link to='/product'><button className='animated-btn'>Add Product</button></Link>
                </div>
            </section>

            <section className="carousel-section">

                <div className="carousel-wrapper">
                    <Carousel
                        autoPlay
                        infiniteLoop
                        showThumbs={false}
                        showStatus={false}
                        onChange={(index) => setCurrentSlide(index)}
                    >
                        <div><img src={watches} alt="Watch" /><p className="legend">Luxry watches</p></div>
                        <div><img src={clothes} alt="Clothes" /><p className="legend">Clothes</p></div>
                        <div><img src={perfumes} alt="Perfumes" /><p className="legend">Perfumes</p></div>
                        <div><img src={makeup} alt="Makeup" /><p className="legend">Makeup</p></div>
                        <div><img src={sendal} alt="Sendal" /><p className="legend">new sliper</p></div>
                        <div><img src={women} alt="women" /><p className="legend">women clothes</p></div>
                        <div><img src={men} alt="men" /><p className="legend">men clothes</p></div>
                    </Carousel>

                    <div className="carousel-side-content">
                        <h3 className='text-center text-primary'> About</h3>
                        <h1 className="side-heading">{headings[currentSlide]}</h1>
                        <p>
                      Explore the latest in fashion and style with our exclusive collections.<br />
                      Discover timeless trends, handpicked to elevate your everyday look.<br />
                      From casual essentials to premium pieces, find what defines your style.<br />
                      Shop smart, look stunning — only at ShopSmart.
                   </p>
                    </div>
                </div>
            </section>
            <section>

            </section>
        </>
    );
}
