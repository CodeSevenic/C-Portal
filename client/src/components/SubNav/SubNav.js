import React, { useEffect } from 'react';
import { BiCheckDouble } from 'react-icons/bi';
import { GrArticle } from 'react-icons/gr';
import { MdOutlineSendTimeExtension, MdOutlineVideoLibrary } from 'react-icons/md';
import { RiFileList3Line } from 'react-icons/ri';
import { SiPrimevideo } from 'react-icons/si';
import { NavLink, useLocation } from 'react-router-dom';
import './SubNav.css';

const SubNav = () => {
  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname); // Logs the current path
  }, [location]);

  return (
    <div className={`${location.pathname === '/log-ticket' ? 'bg-moYellow' : ''}`}>
      <div className={`nav-items max-w-6xl mx-auto px-5 pt-20 pb-10`}>
        <ul className="grid grid-cols-2 lg:flex gap-5 md:gap-9 justify-around">
          <li className="rounded-xl border-1 border-gray-50 shadow-md">
            <NavLink
              to={'/'}
              className="nav-link font-semibold px-5 md:px-10 min-w-[120px] md:min-w-[200px] py-5  flex flex-col gap-[5px] md:gap-0  items-center text-sm md:text-xl"
            >
              <BiCheckDouble className="text-5xl text-moBlue  block" />
              <span className="text-gray-500 text-center">View tickets</span>
            </NavLink>
          </li>
          <li className="rounded-xl border-1 border-gray-50 shadow-md">
            <NavLink
              to={'/log-ticket'}
              className="nav-link font-semibold  px-5 md:px-10 min-w-[120px] md:min-w-[200px] py-5 flex flex-col items-center text-sm md:text-xl"
            >
              <MdOutlineSendTimeExtension className="text-5xl text-moBlue  block" />
              <span className="text-gray-500 text-center">Create a ticket</span>
            </NavLink>
          </li>

          <li className="rounded-xl border-1 border-gray-50 shadow-md">
            <NavLink
              to={'/resources'}
              className="nav-link font-semibold   px-5 md:px-10 min-w-[120px] md:min-w-[200px] py-5 flex flex-col  items-center text-sm md:text-xl"
            >
              <GrArticle className="text-5xl text-moBlueLight block" />
              <span className="text-gray-500 text-center">Resources</span>
            </NavLink>
          </li>
          <li className="rounded-xl border-1 border-gray-50 shadow-md">
            <NavLink
              to={'/webinars'}
              className="nav-link font-semibold   px-5 md:px-10 min-w-[120px] md:min-w-[200px] py-5 flex  flex-col  items-center text-sm md:text-xl"
            >
              <MdOutlineVideoLibrary className="text-5xl  text-moBlue block" />
              <span className="text-gray-500 text-center">Webinars</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SubNav;
