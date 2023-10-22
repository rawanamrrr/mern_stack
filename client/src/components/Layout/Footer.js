import React from 'react';
import { Link } from 'react-router-dom';
import About from './../../pages/About';
import Contact from './../../pages/Contact';

const Footer = () => {
  return (
    <div className='footer'>
      <h6 className='text-center'>
            
        </h6>
        <h6 className='text-center'>
            Copyrights &copy;2023 ZeRa.eg
        </h6>
        <p className='text-center mt-3'>
          <Link to="/about">About</Link>|
          <Link to="/contact">Contact</Link>|
          <Link to="/policy">Exchange Policy</Link>


        </p>
    </div>
  );
};

export default Footer;