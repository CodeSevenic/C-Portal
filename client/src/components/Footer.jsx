import React from 'react';
import Logo from './../assets/images/MO-Logo-Footer.svg';
import Facebook from './../assets/images/Facebook.svg';
import Linkedin from './../assets/images/LinkedIn.svg';
import Instagram from './../assets/images/Instagram.svg';

const Footer = () => (
  <div className=" pt-20 bg-moBlue">
    <div className="footer-container grid xl:grid-cols-4 gap-x-12 max-w-7xl mx-auto px-4">
      <div>
        <a href="/" className="logo block mb-8">
          <img src={Logo} alt="logo" />
        </a>
        <p className="text-white">We are awesome at making things function and look great!</p>
        <div className="social-links flex gap-5 mt-8">
          <a
            className="block filter hover:brightness-150 transition-all duration-300"
            href="https://www.facebook.com/MOSouthAfrica"
            target="_blank"
            rel="noreferrer"
          >
            <img src={Facebook} alt="Facebook Logo" />
          </a>
          <a
            className="block filter hover:brightness-150 transition-all duration-300"
            target="_blank"
            href="https://www.instagram.com/mo.agency_za/?hl=en"
            rel="noreferrer"
          >
            <img src={Instagram} alt="Instagram Logo" />
          </a>
          <a
            className="block filter hover:brightness-150 transition-all duration-300"
            target="_blank"
            href="https://www.linkedin.com/company/2258363"
            rel="noreferrer"
          >
            <img src={Linkedin} alt="Linkedin Logo" />
          </a>
        </div>
      </div>
      <div className="mt-8 md:mt-0">
        <h3 className="text-white font-bold mb-12">Quick Links</h3>
        <ul className="text-white">
          <li className="mb-3 hover:text-moBlueLight transition-all duration-300">
            <a target="_blank" rel="noreferrer" href="https://www.mo.agency/about-us">
              About Us
            </a>
          </li>
          <li className="mb-3 hover:text-moBlueLight transition-all duration-300">
            <a target="_blank" rel="noreferrer" href="https://www.mo.agency/blog">
              Blog
            </a>
          </li>
          <li className="mb-3 hover:text-moBlueLight transition-all duration-300">
            <a target="_blank" rel="noreferrer" href="https://www.mo.agency/pricing">
              Pricing
            </a>
          </li>
          <li className="mb-3 hover:text-moBlueLight transition-all duration-300">
            <a target="_blank" rel="noreferrer" href="https://www.mo.agency/careers">
              Careers
            </a>
          </li>
          <li className="mb-3 hover:text-moBlueLight transition-all duration-300">
            <a target="_blank" rel="noreferrer" href="https://www.mo.agency/contact">
              Contact Us
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h3 className="text-white font-bold mb-12">South Africa</h3>
        <p className="uppercase font-bold text-moBlueLight mb-3  text-[12px]">Johannesburg</p>
        <p className="text-white text-[16px] mb-3">
          1st Floor, Hyde Gate,
          <br />
          Hyde Park Lane <br />
          Hyde Park,
          <br /> Johannesburg
        </p>
        <p className="uppercase font-bold text-moBlueLight mb-3  text-[12px]">Cape Town</p>
        <p className="text-white text-[16px] mb-3">
          2nd Floor, Spaces <br />
          1 Bridgeway, <br /> Bridgeways Precinct <br />
          Century City, <br /> Cape Town
        </p>
      </div>
      <div>
        <h3 className="text-white font-bold mb-12">United Kingdom</h3>
        <p className="uppercase font-bold text-moBlueLight mb-3  text-[12px]">MAIDENHEAD</p>
        <p className="text-white text-[16px] mb-3">
          Pembroke Gate, <br /> Newlands Drive <br />
          Maidenhead
        </p>
      </div>
    </div>
    <div className="flex flex-col md:flex-row items-center gap-2 justify-between px-6 max-w-5xl mx-auto pt-20 pb-10">
      <p className="text-white text-sm md:text-[16px]">© MO Agency 2023</p>
      <a
        className="block text-white text-sm md:text-[16px] hover:text-moBlueLight transition-all duration-300"
        target="_blank"
        href="https://www.mo.agency/terms-conditions"
        rel="noreferrer"
      >
        Terms & Conditions
      </a>
      <a
        className="block text-white text-sm md:text-[16px] hover:text-moBlueLight transition-all duration-300"
        target="_blank"
        href="https://www.mo.agency/privacy-policy"
        rel="noreferrer"
      >
        Privacy Policy
      </a>
    </div>
  </div>
);

export default Footer;
