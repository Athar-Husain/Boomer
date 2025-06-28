import React from 'react';
import logo from '../assets/images/logo.png'

const Footer = () => {
  return (
    <footer id="contact" className="bg-dark text-light pt-5 pb-4">
      <div className="container">
        <div className="row gy-4 ">
          {/* Logo & About */}
          <div className="col-lg-4 col-md-6 text-start">
            <div style={{ maxWidth: '300px' }}>
              <a href="#home" className="navbar-brand mb-3 d-block">
                <img src={logo} alt="Logo" style={{ height: '60px' }} />
              </a>
              <p className="small text-light">
                Helping local businesses grow by delivering smart, automated
                WhatsApp coupon campaigns that customers actually open and use.
              </p>
            </div>
          </div>


          {/* Social Links */}
          <div className="col-lg-4 col-md-6">
            <h5 className="text-white mb-3">Follow Us</h5>
            <div className="d-flex justify-content-center"> {/* Corrected class name */}
              <a href="#" className="btn btn-outline-light btn-social me-2">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="btn btn-outline-light btn-social me-2">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="btn btn-outline-light btn-social me-2">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="btn btn-outline-light btn-social">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="col-lg-4 col-md-6">
            <h5 className="text-white mb-3 text-start">Contact Us</h5>
            <div className='text-start'>
              <p className="small text-light mb-2">
                <i className="fas fa-map-marker-alt me-2"></i>W. No: 19, Ground Floor,
                Near Radio Park, Cowl Bazar, Ballari-583102
              </p>
              <p className="small text-light mb-2">
                <i className="fas fa-envelope me-2"></i>support@thebomer.net
              </p>
              <p className="small text-light mb-2">
                <i className="fas fa-phone me-2"></i>+91 80502 27888
              </p>
              <p className="small text-light">
                <i className="fab fa-whatsapp me-2"></i>+91 80502 27888
              </p>
            </div>
          </div>



        </div>

        {/* Copyright */}
        <div className="container-fluid copyright py-4">
          <div className="container">
            <div className="row g-4 align-items-center">
              <div className="col-md-6 text-center text-md-start mb-md-0">
                <span className="text-white">
                  <a href="#">
                    <i className="fas fa-copyright text-light me-2"></i>2025
                    Boomerang
                  </a>
                  , All right reserved.
                </span>
              </div>
              <div className="col-md-6 text-center text-md-end text-white">
                Developed By{' '}
                <a className="border-bottom" href="https://athar-husain.tech">
                  Athar Husain
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
