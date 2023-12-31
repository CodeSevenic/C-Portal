﻿import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdEventAvailable, MdEventBusy } from 'react-icons/md';
import './Webinars.css';
import { useStateContext } from '../../contexts/ContextProvider';

function Webinars() {
  const { error, webinars } = useStateContext();

  const upcomingWebinars = webinars.filter((webinar) => new Date(webinar.start_time) > new Date());
  const pastWebinars = webinars.filter((webinar) => new Date(webinar.start_time) <= new Date());

  const formatDate = (dateString) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
    }).format(new Date(dateString));
  };

  return (
    <div className="p-4 max-w-7xl mx-auto px-5 xl:px-0 pt-20 pb-32">
      {error && <p className="mb-4 text-red-500">{error}</p>}

      <h2 className="text-4xl font-bold mb-8">Upcoming Webinars</h2>
      <ul className="space-y-4">
        {upcomingWebinars.map((webinar) => (
          <li key={webinar.id} className="webinar border p-4 rounded-md bg-white shadow-md">
            <h3 className="text-2xl font-medium flex items-center gap-2 mb-4">
              <MdEventAvailable className=" text-moBlue" />
              {webinar.topic}
            </h3>
            <p className="text-gray-600 mb-2">{formatDate(webinar.start_time)}</p>
            <p className="text-gray-600">{webinar.agenda}</p>
            <a
              href={webinar.join_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-xl text-moBlueLight hover:underline"
            >
              Join Now
            </a>
          </li>
        ))}
      </ul>

      <h2 className="text-4xl font-bold mt-8 mb-8">Past Webinars</h2>
      <ul className="space-y-4">
        {pastWebinars.map((webinar) => (
          <li key={webinar.id} className="webinar border p-4 rounded-md bg-white shadow-md">
            <h3 className="text-2xl font-medium flex items-center gap-2 mb-4">
              <MdEventBusy className=" text-moBlue" />
              {webinar.topic}
            </h3>
            <p className="text-gray-600 mb-2">{formatDate(webinar.start_time)}</p>
            <p className="text-gray-600">{webinar.agenda}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Webinars;
