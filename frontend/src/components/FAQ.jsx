import React from 'react';
import about1 from "../assets/images/about-1.png";

const FAQ = () => {
    return (
        <section className="shadow-bottom-colored">
            <div id="faq" className="container-fluid FAQ bg-light overflow-hidden py-5">
                <div className="container py-5">
                    <div className="row g-5 align-items-center">
                        <div className="col-lg-6 wow fadeInLeft" data-wow-delay="0.3s">
                            <div className="FAQ-img RotateMoveRight rounded">
                                <img src={about1} className="img-fluid w-100" alt="About" />
                            </div>
                        </div>
                        <div className="col-lg-6 wow fadeInRight" data-wow-delay="0.1s">
                            <div className="accordion" id="accordionExample">

                                {/* FAQ Item 1 */}
                                <div className="accordion-item border-0 mb-4">
                                    <h2 className="accordion-header" id="headingOne">
                                        <button
                                            className="accordion-button rounded-top"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseOne"
                                            aria-expanded="true"
                                            aria-controls="collapseOne"
                                        >
                                            How do WhatsApp Coupons work?
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseOne"
                                        className="accordion-collapse collapse show"
                                        aria-labelledby="headingOne"
                                        data-bs-parent="#accordionExample"
                                    >
                                        <div className="accordion-body my-2">
                                            <p>
                                                Simply enter your customer’s number, customize the offer, and hit send.
                                                The coupon is instantly delivered to their WhatsApp with a clickable
                                                message and redemption instructions.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* FAQ Item 2 */}
                                <div className="accordion-item border-0 mb-4">
                                    <h2 className="accordion-header" id="headingTwo">
                                        <button
                                            className="accordion-button collapsed rounded-top"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseTwo"
                                            aria-expanded="false"
                                            aria-controls="collapseTwo"
                                        >
                                            Can I customize the coupons I send out?
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseTwo"
                                        className="accordion-collapse collapse"
                                        aria-labelledby="headingTwo"
                                        data-bs-parent="#accordionExample"
                                    >
                                        <div className="accordion-body my-2">
                                            <p>
                                                Absolutely! You can personalize every coupon with your preferred discount type,
                                                set minimum spend amounts, choose expiry dates, and even include clickable links
                                                to your Facebook or Instagram store.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* FAQ Item 3 */}
                                <div className="accordion-item border-0 mb-4">
                                    <h2 className="accordion-header" id="headingThree">
                                        <button
                                            className="accordion-button collapsed rounded-top"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseThree"
                                            aria-expanded="false"
                                            aria-controls="collapseThree"
                                        >
                                            Is the platform only for retail stores?
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseThree"
                                        className="accordion-collapse collapse"
                                        aria-labelledby="headingThree"
                                        data-bs-parent="#accordionExample"
                                    >
                                        <div className="accordion-body my-2">
                                            <p>
                                                While it's perfect for retail, any local business looking to boost customer
                                                engagement through WhatsApp can use it.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* FAQ Item 4 */}
                                <div className="accordion-item border-0">
                                    <h2 className="accordion-header" id="headingFour">
                                        <button
                                            className="accordion-button collapsed rounded-top"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseFour"
                                            aria-expanded="false"
                                            aria-controls="collapseFour"
                                        >
                                            What makes WhatsApp better than email or SMS for coupons?
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseFour"
                                        className="accordion-collapse collapse"
                                        aria-labelledby="headingFour"
                                        data-bs-parent="#accordionExample"
                                    >
                                        <div className="accordion-body my-2">
                                            <p>
                                                WhatsApp has over 90% open rates, far higher than email or SMS.
                                                Messages are seen instantly, which means your time-limited offers
                                                have a much better chance of being redeemed quickly.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
