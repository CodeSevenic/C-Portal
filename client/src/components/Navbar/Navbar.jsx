import React, { useEffect, useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';

import avatar from '../../assets/images/account-icon.png';
import UserProfile from '../UserProfile';
import { useStateContext } from '../../contexts/ContextProvider';
import { useAuthStateContext } from '../../contexts/AuthContext';
import Logo from '../../assets/images/MO-Logo.svg';

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  // <TooltipComponent content={title} position="BottomCenter">
  <button
    type="button"
    onClick={() => customFunc()}
    style={{ color }}
    className="relative text-xl rounded-full p-3 hover:bg-light-gray"
  >
    <span
      style={{ background: dotColor }}
      className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
    />
    {icon}
  </button>
  // </TooltipComponent>
);

const Navbar = () => {
  const {
    currentColor,
    activeMenu,
    setActiveMenu,
    handleClick,
    isClicked,
    setScreenSize,
    screenSize,
  } = useStateContext();

  const username = sessionStorage.getItem('username');

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  return (
    <div className="flex justify-between p-5 xl:px-0 relative max-w-7xl w-full mx-auto">
      {/* <NavButton
        title="Menu"
        customFunc={handleActiveMenu}
        color={currentColor}
        icon={<AiOutlineMenu />}
      /> */}
      <div className="max-w-[140px] md:max-w-[unset] flex">
        <img height={30} src={Logo} alt="Primary Logo" />
      </div>
      <div className="flex">
        {/* <NavButton
          title="Cart"
          customFunc={() => handleClick('cart')}
          color={currentColor}
          icon={<FiShoppingCart />}
        />
        <NavButton
          title="Chat"
          dotColor="#03C9D7"
          customFunc={() => handleClick('chat')}
          color={currentColor}
          icon={<BsChatLeft />}
        />
        <NavButton
          title="Notification"
          dotColor="rgb(254, 201, 15)"
          customFunc={() => handleClick('notification')}
          color={currentColor}
          icon={<RiNotification3Line />}
        /> */}
        {/* <TooltipComponent content="Profile" position="BottomCenter"> */}
        <div
          className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
          onClick={() => handleClick('userProfile')}
        >
          <img
            width={32}
            height={32}
            className="rounded-full hidden md:block"
            src={avatar}
            alt="user-profile"
          />
          <p>
            <span className="text-gray-400 text-14">Hi,</span>{' '}
            <span className="text-gray-400 font-bold ml-1 text-[16px] md:text-xl">{username}</span>
          </p>
          <MdKeyboardArrowDown className="text-gray-400 text-14" />
        </div>
        {/* </TooltipComponent> */}
        {isClicked.userProfile && <UserProfile />}
      </div>
    </div>
  );
};

export default Navbar;
