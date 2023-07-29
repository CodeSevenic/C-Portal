import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { SiShopware } from 'react-icons/si';
import { MdKeyboardArrowDown, MdKeyboardArrowUp, MdOutlineCancel } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { links } from '../../data/dummy';
import { useStateContext } from '../../contexts/ContextProvider';

import Logo from '../../assets/images/Artboard.png';
import { useAuthStateContext } from '../../contexts/AuthContext';
import { MdAccountTree } from 'react-icons/md';
import AddAccount from '../AddAccount';
import baseURL from '../../url';

const Sidebar = () => {
  const { currentColor, activeMenu, setActiveMenu, screenSize, authPopup } = useStateContext();
  const { hubSpotIds, setHubSpotIds, userData, setUserData, authAccountDeleted } =
    useAuthStateContext();

  const [dropdownOpen, setDropdownOpen] = useState(true);
  const userId = sessionStorage.getItem('userId');
  const fetchUserAuths = () => {
    fetch(`${baseURL}/api/user-auths/${userId}`, {
      credentials: 'include',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // console.log('data: ', data);
        setUserData(data);
        setHubSpotIds(Object.keys(data.appAuths));
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchUserAuths();
  }, [authPopup, authAccountDeleted]);

  // console.log('authAccountDeleted: ', authAccountDeleted);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink = 'flex items-center gap-5 px-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2';
  const normalLink =
    'flex items-center gap-5 px-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to="/"
              onClick={handleCloseSideBar}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              <img width={60} height={60} src={Logo} alt="YuboData Logo" /> <span>YuboData</span>
            </Link>
            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                style={{ color: currentColor }}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
