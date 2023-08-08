// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function Webinars() {
//   const [upcomingWebinars, setUpcomingWebinars] = useState([]);
//   const [pastWebinars, setPastWebinars] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function fetchWebinars() {
//       try {
//         const response = await axios.get('http://localhost:4000/api/webinars');
//         setUpcomingWebinars(response.data.upcoming || []);
//         setPastWebinars(response.data.past ? response.data.past.slice(0, 5) : []); // Only take the last 5 webinars for display
//       } catch (error) {
//         console.error('Error fetching webinars:', error);
//         setError('Failed to fetch webinars. Please try again later.');
//       }
//     }

//     fetchWebinars();
//   }, []);

//   return (
//     <div>
//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       <h2>Upcoming Webinars</h2>
//       <ul>
//         {upcomingWebinars.map((webinar) => (
//           <li key={webinar.id}>
//             {webinar.topic} -
//             <a href={webinar.join_url} target="_blank" rel="noopener noreferrer">
//               Join Now
//             </a>
//           </li>
//         ))}
//       </ul>

//       <h2>Past Webinars (Last 5)</h2>
//       <ul>
//         {pastWebinars.map((webinar) => (
//           <li key={webinar.id}>{webinar.topic}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Webinars;

import React from 'react';

const Webinars = () => {
  return (
    <div className="py-20">
      <h1 className="text-xl md:text-4xl lg:text-5xl xl:text-7xl font-bold text-center">
        Webinars Coming Soon 😁
      </h1>
    </div>
  );
};

export default Webinars;
