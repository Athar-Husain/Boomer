// src/components/Navbar.jsx
import React from 'react';
import logo from '../assets/images/logo.png'

const Navbar = () => {
    return (
        <section className=" shadow-bottom-colored ">
            <nav className="navbar navbar-expand-lg sticky-top navbar-light mb-10 px-4 px-lg-5 py-3 py-lg-0">
                <a href="#home" className="navbar-brand p-0">
                    <img src={logo} alt="Logo" />
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarCollapse"
                >
                    <span className="fa fa-bars"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <div className="navbar-nav ms-auto py-0">
                        <a href="#home" className="nav-item nav-link active">
                            Home
                        </a>
                        <a href="#about" className="nav-item nav-link">
                            About
                        </a>
                        <a href="#services" className="nav-item nav-link">
                            Services
                        </a>
                        <a href="#features" className="nav-item nav-link">
                            Features
                        </a>
                        <a href="#faq" className="nav-item nav-link">
                            FAQs
                        </a>
                        <a href="#contact" className="nav-item nav-link">
                            Contact Us
                        </a>
                    </div>
                </div>
            </nav>
        </section>
    );
};

export default Navbar;
