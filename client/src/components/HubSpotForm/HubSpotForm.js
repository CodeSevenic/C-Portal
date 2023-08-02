import React, { useEffect } from 'react';

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

    // On component unmount, do not remove the script
  }, []);

  return (
    <div className="bg-moYellow py-20">
      <div className="grid grid-cols-2">
        <div></div>
        <div id={formId}></div>
      </div>
    </div>
  );
};

export default HubSpotForm;
