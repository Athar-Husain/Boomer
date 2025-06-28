// src/components/Hero.jsx
import React from 'react';
import sty1 from '../assets/images/sty-1.png'
import hero1 from '../assets/images/hero-img-1.png'

const Hero = () => {
    return (

        <section className="shadow-bottom-colored">
            <div className="hero-header overflow-hidden px-5 mt-5 pt-5">
                {/* Added mt-5 pt-5 to offset fixed navbar */}
                <div className="rotate-img">
                    <img src={sty1} className="img-fluid w-100" alt="boomerang Hero" />
                    <div className="rotate-sty-2"></div>
                </div>
                <div className="row gy-5 align-items-center">
                    <div className="col-lg-6">
                        <h1 className="display-4 text-dark mb-4">
                            Boost Your Store Sales with WhatsApp Coupons
                        </h1>
                        <p className="fs-4 mb-4">
                            Engage your customers by sending automated discount coupons directly via WhatsApp.
                            Drive repeat visits and grow your business effortlessly.
                        </p>
                        <a href="#" className="btn btn-primary rounded-pill py-3 px-5">
                            Get Started
                        </a>
                    </div>
                    <div className="col-lg-6">
                        <img
                            src={hero1}
                            className="img-fluid w-100 h-100"
                            alt="Hero"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
