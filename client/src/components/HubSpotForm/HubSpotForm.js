﻿import React, { useEffect } from 'react';
import './HubSpotForm.css';

const HubSpotForm = () => {
  const scriptId = 'hubspotFormScript';
  const formId = 'hubspot-form';

  useEffect(() => {
    // Check if script tag already exists
    const existingScript = document.getElementById(scriptId);
    if (!existingScript) {
      // Create script tag
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = '//js.hsforms.net/forms/embed/v2.js';
      document.body.appendChild(script);

      script.addEventListener('load', () => {
        if (window.hbspt) {
          // Target div with id 'hubspot-form'
          window.hbspt.forms.create({
            target: `#${formId}`,
            region: 'na1',
            portalId: '2697939',
            formId: '1cfc8d0a-a8e8-4361-8524-b741a8d6a1f3',
          });
          // Use JS to set email value to type="email" input after 3 seconds
        }
      });
    } else if (window.hbspt) {
      // If script tag exists already, then just create the form
      window.hbspt.forms.create({
        target: `#${formId}`,
        region: 'na1',
        portalId: '2697939',
        formId: '1cfc8d0a-a8e8-4361-8524-b741a8d6a1f3',
      });
    }

    if (window.hbspt) {
      setTimeout(() => {
        if (document.querySelector('input[type="email"]')) {
          document.querySelector('input[type="email"]').value = sessionStorage.getItem('email');
        }
      }, 2000);
    }

    // On component unmount, do not remove the script
  }, []);

  setTimeout(() => {
    if (document.querySelector('input[type="email"]')) {
      document.querySelector('input[type="email"]').value = sessionStorage.getItem('email');
    }
  }, 4000);

  return (
    <div className="bg-moYellow py-20">
      <div className="grid md:grid-cols-2 max-w-7xl px-10 mx-auto">
        <div className="py-0 md:py-10 my-0 md:my-20">
          <h1 className="text-5xl md:[4rem] lg:text-[4.8rem] leading-[60px] md:leading-[90px] text-white font-bold">
            Submit a HubSpot Support Ticket.
          </h1>
          <p className="mt-8 text-[1.3rem]">
            One of our specialists will respond with an answer shortly.
            <br />
            <br />
            Please note, if you are <b>not currently registered</b> with us, please allow us time to
            register your account.
          </p>
        </div>
        <div className="form-bg flex md:justify-end">
          <div
            className="my-20 w-full md:max-w-md py-14 px-8 rounded-lg shadow-xl bg-[#ffffffe7]"
            id={formId}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default HubSpotForm;
