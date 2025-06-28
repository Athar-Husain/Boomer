import React from 'react';
import feature1 from "../assets/images/features-1.png"

const Features = () => {
    return (

        <section className="shadow-bottom-colored">
            <div id="features" className="container-fluid feature overflow-hidden py-5">
                <div className="container py-5">
                    <div
                        className="text-center mx-auto mb-5 wow fadeInUp"
                        data-wow-delay="0.1s"
                        style={{ maxWidth: '900px' }}
                    >
                        <h4 className="text-primary">Our Features</h4>
                        <h1 className="display-5 mb-4">Smart Features That Drive Real Sales</h1>
                        <p className="mb-0">
                            Everything you need to attract, retain, and grow your customer base
                            using automated WhatsApp coupon campaigns. No spam, just results.
                        </p>
                    </div>
                    <div className="row g-4 justify-content-center text-center mb-5">
                        <div className="col-md-6 col-lg-4 col-xl-3 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="text-center p-4">
                                <div className="d-inline-block rounded bg-light p-4 mb-4">
                                    <i className="fa-solid fa-paper-plane fa-5x text-secondary"></i>
                                </div>
                                <div className="feature-content">
                                    <a href="#" className="h4">
                                        Simple Coupon Sending
                                        <i className="fa fa-long-arrow-alt-right"></i>
                                    </a>
                                    <p className="mt-4 mb-0">
                                        Send up to 3 customized WhatsApp coupons instantly by entering
                                        a phone number. No app download required.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 col-xl-3 wow fadeInUp" data-wow-delay="0.3s">
                            <div className="text-center p-4">
                                <div className="d-inline-block rounded bg-light p-4 mb-4">
                                    <i className="fa-solid fa-feather fa-5x text-secondary"></i>
                                </div>
                                <div className="feature-content">
                                    <a href="#" className="h4">
                                        Full Coupon Customization
                                        <i className="fa fa-long-arrow-alt-right"></i>
                                    </a>
                                    <p className="mt-4 mb-0">
                                        Choose your discount type, add minimum spend rules, set expiry
                                        dates, and include clickable links to your socials.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 col-xl-3 wow fadeInUp" data-wow-delay="0.5s">
                            <div className="text-center rounded p-4">
                                <div className="d-inline-block rounded bg-light p-4 mb-4">
                                    <i className="fa-solid fa-bell fa-5x text-secondary"></i>
                                </div>
                                <div className="feature-content">
                                    <a href="#" className="h4">
                                        Expiry Reminders
                                        <i className="fa fa-long-arrow-alt-right"></i>
                                    </a>
                                    <p className="mt-4 mb-0">
                                        Automatic reminders encourage customers to redeem coupons
                                        before they expire—maximizing campaign effectiveness.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 col-xl-3 wow fadeInUp" data-wow-delay="0.7s">
                            <div className="text-center rounded p-4">
                                <div className="d-inline-block rounded bg-light p-4 mb-4">
                                    <i className="fas fa-tasks fa-5x text-secondary"></i>
                                </div>
                                <div className="feature-content">
                                    <a href="#" className="h4">
                                        Coupon Status Tracking
                                        <i className="fa fa-long-arrow-alt-right"></i>
                                    </a>
                                    <p className="mt-4 mb-0">
                                        Track every coupon’s usage status — active, redeemed, or
                                        expired — directly from your dashboard.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row g-5 pt-5" style={{ marginTop: '6rem' }}>
                        <div className="col-lg-6 wow fadeInLeft" data-wow-delay="0.1s">
                            <h4 className="text-primary">Why It Works</h4>
                            <h1 className="display-5 mb-4">Turn Casual Visitors Into Repeat Customers</h1>
                            <p className="mb-4">
                                Unlike email or SMS, WhatsApp messages get opened and read almost
                                instantly. That means your coupons are seen, clicked, and redeemed
                                faster—resulting in more loyal customers and higher store revenue.
                            </p>
                            <div className="row g-4">
                                <div className="col-6">
                                    <div className="d-flex">
                                        <i className="fas fa-paper-plane fa-4x text-secondary"></i>
                                        <div className="d-flex flex-column ms-3">
                                            <h2 className="mb-0 fw-bold">12K+</h2>
                                            <small className="text-dark">Coupons Delivered</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="d-flex">
                                        <i className="fas fa-chart-line fa-4x text-secondary"></i>
                                        <div className="d-flex flex-column ms-3">
                                            <h2 className="mb-0 fw-bold">78%</h2>
                                            <small className="text-dark">Redemption Rate</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 wow fadeInRight" data-wow-delay="0.1s">
                            <div
                                className="feature-img RotateMoveLeft h-100"
                                style={{ objectFit: 'cover' }}
                            >
                                <img
                                    src={feature1}
                                    className="img-fluid w-100 h-100"
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;
