import React from 'react';
import aboutimg from '../assets/images/about_boomerang.png';

const About = () => {
    return (

        <section className="shadow-bottom-colored">
            <div
                id="about"
                className="container-fluid overflow-hidden py-5"
            // style={{ marginTop: '6rem' }}
            >
                <div className="container py-5">
                    <div className="row g-5 align-items-center">
                        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="RotateMoveLeft">
                                <img
                                    src={aboutimg}
                                    className="img-fluid w-100"
                                    alt="Our mission"
                                />
                            </div>
                        </div>
                        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.3s">
                            <h4 className="mb-1 text-primary">Who We Are</h4>
                            <h1 className="display-5 mb-4">
                                Helping Local Businesses Win With Smart WhatsApp Marketing
                            </h1>
                            <p className="mb-4">
                                We’re not just a coupon platform. We're a growth tool tailored for
                                local retailers who want to connect better, sell more, and build
                                stronger customer relationships. With our automated WhatsApp
                                coupon system, store owners can instantly reach customers with
                                targeted offers that drive results.
                            </p>
                            <p className="mb-4">
                                Say goodbye to complicated tools and wasted marketing. Say hello
                                to simplicity, engagement, and growth—on autopilot.
                            </p>
                            <a href="#features" className="btn btn-primary rounded-pill py-3 px-5">
                                Explore Features
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
