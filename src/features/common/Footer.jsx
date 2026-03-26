// src/features/common/Footer.jsx
import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-minimal">
      <div className="footer-content-min">
        <div className="footer-left">
          <p className="footer-credit">
            © {currentYear} <span className="owner-name">יהודית יברוב</span>
          </p>
        </div>

        <div className="footer-center">
          <a href="mailto:Y00556735623@GMAIL.COM" className="footer-email">
            Y00556735623@GMAIL.COM
          </a>
        </div>

        <div className="footer-right">
          <p className="footer-reserved">All Rights Reserved ©</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;