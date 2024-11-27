import React from 'react';
import './footer.css'; 
import Logo from '../Header/books.png'

import Twitter from './twitter.png';
import Instagram from './instagram.png';
import Youtube from './youtube.png';
import Facebook from './facebook.png';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="branding">
                    <h3>Літературний світ</h3>
                    <p>Відкрийте для себе неймовірний світ літератури. Від класичних творів до сучасних бестселерів — знайдете щось для кожного смаку. Читання розширює горизонти!</p>
                </div>

                <div className="logo">
        <img src={Logo} alt="Logo" />
      </div>

                <div className="social-icons">
                    <img src={Facebook} alt="Facebook" className="social-icon" />
                    <img src={Twitter} alt="Twitter" className="social-icon" />
                    <img src={Instagram} alt="Instagram" className="social-icon" />
                    <img src={Youtube} alt="YouTube" className="social-icon" />
                </div>
            </div>

            <div className="footer-bottom">
                <hr />
                <p>2020 IoT © Copyright all rights reserved</p>
            </div>
        </footer>
    );
};

export default Footer;