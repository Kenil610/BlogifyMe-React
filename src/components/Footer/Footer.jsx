import React from 'react';
import light from '../../assets/logo-light.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-title">
        <img src={light} alt="Logo" width="200px" height="65px" />
        </div>
        <p className="footer-description">
          Bringing delicious flavors to your table since 2023.
        </p>
        <p className="footer-copyright">
          &copy; {new Date().getFullYear()} Food Castle. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
