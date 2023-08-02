﻿import React from 'react';
import { BiCheckDouble } from 'react-icons/bi';
import { GrArticle } from 'react-icons/gr';
import { MdOutlineSendTimeExtension, MdOutlineVideoLibrary } from 'react-icons/md';
import { RiFileList3Line } from 'react-icons/ri';
import { SiPrimevideo } from 'react-icons/si';
import { NavLink } from 'react-router-dom';

const SubNav = () => {
  // Create 3 nav items the react-router way
  return (
    <div className="nav-items max-w-6xl mx-auto px-5 pt-20">
      <ul className="flex gap-9 justify-around">
        <li>
          <NavLink className="font-semibold border-1 border-gray-50 shadow-md rounded-xl px-10 min-w-[200px] py-5 flex flex-col items-center text-xl">
            <MdOutlineSendTimeExtension className="text-5xl text-moBlue  block" />
            <span className="text-gray-500 ">Create a ticket</span>
          </NavLink>
        </li>
        <li>
          <NavLink className="font-semibold border-1 border-gray-50 shadow-md rounded-xl px-10 min-w-[200px] py-5  flex flex-col  items-center text-xl">
            <BiCheckDouble className="text-5xl text-moBlue  block" />
            <span className="text-gray-500">View tickets</span>
          </NavLink>
        </li>
        <li>
          <NavLink className="font-semibold border-1 border-gray-50 shadow-md rounded-xl px-10 min-w-[200px] py-5 flex flex-col  text-gray-500 items-center text-xl">
            <GrArticle className="text-5xl  text-moBlue block" />
            <span className="text-gray-500">Resources</span>
          </NavLink>
        </li>
        <li>
          <NavLink className="font-semibold border-1 border-gray-50 shadow-md rounded-xl px-10 min-w-[200px] py-5 flex  flex-col text-gray-500 items-center text-xl">
            <MdOutlineVideoLibrary className="text-5xl  text-moBlue block" />
            Webinars
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SubNav;
