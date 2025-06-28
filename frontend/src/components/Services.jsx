import React from 'react';

const Services = () => {
    return (

        <section className="shadow-bottom-colored">
            <div id="services" className="container-fluid service py-5">
                <div className="container py-5">
                    <div
                        className="text-center mx-auto mb-5 wow fadeInUp"
                        data-wow-delay="0.1s"
                        style={{ maxWidth: '900px' }}
                    >
                        <h4 className="mb-1 text-primary">Our Service</h4>
                        <h1 className="display-5 mb-4">What We Can Do For You</h1>
                        <p className="mb-0">
                            We help retail businesses grow by making customer engagement
                            effortless. From sending personalized discount coupons via WhatsApp
                            to tracking usage and boosting repeat visits — our platform is
                            designed to turn first-time buyers into loyal customers with minimal
                            effort.
                        </p>
                    </div>
                    <div className="row g-4 justify-content-center">
                        <div className="col-md-6 col-lg-4 col-xl-3 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="service-item text-center rounded p-4">
                                <div className="service-icon d-inline-block bg-light rounded p-4 mb-4">
                                    <i className="fa-brands fa-square-whatsapp fa-5x text-secondary"></i>
                                </div>
                                <div className="service-content">
                                    <h4 className="mb-4">Seamless WhatsApp Integration</h4>
                                    <p className="mb-4">
                                        No complicated setup! Our app sends coupons directly through
                                        WhatsApp ensuring maximum reach and ease of use for your
                                        customers.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 col-xl-3 wow fadeInUp" data-wow-delay="0.3s">
                            <div className="service-item text-center rounded p-4">
                                <div className="service-icon d-inline-block bg-light rounded p-4 mb-4">
                                    <i className="fa-solid fa-repeat fa-5x text-secondary"></i>
                                </div>
                                <div className="service-content">
                                    <h4 className="mb-4">Boost Repeat Customer Visits</h4>
                                    <p className="mb-4">
                                        Use time-bound discounts to motivate customers to return
                                        frequently and increase your store’s sales velocity.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 col-xl-3 wow fadeInUp" data-wow-delay="0.5s">
                            <div className="service-item text-center rounded p-4">
                                <div className="service-icon d-inline-block bg-light rounded p-4 mb-4">
                                    <i className="fa-brands fa-instalod fa-5x text-secondary"></i>
                                </div>
                                <div className="service-content">
                                    <h4 className="mb-4">Custom Social Media Links</h4>
                                    <p className="mb-4">
                                        Add your Facebook or Instagram store link in the coupon
                                        message to grow your social following along with sales.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 col-xl-3 wow fadeInUp" data-wow-delay="0.7s">
                            <div className="service-item text-center rounded p-4">
                                <div className="service-icon d-inline-block bg-light rounded p-4 mb-4">
                                    <i className="fa-solid fa-chart-simple fa-5x text-secondary"></i>
                                </div>
                                <div className="service-content">
                                    <h4 className="mb-4">Detailed Usage Analytics</h4>
                                    <p className="mb-4">
                                        Track coupon performance and customer engagement metrics right
                                        from the admin panel to optimize your strategies.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;
