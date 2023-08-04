import React from 'react';

import SettingsIcon from '../SettingsIcon';
import ThemeSettings from '../ThemeSettings';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer';
import SubNav from '../SubNav/SubNav';

function Layout({ children, activeMenu, themeSettings }) {
  return (
    <div className="flex relative">
      <div className={'bg-white dark:bg-main-dark-bg  w-full min-h-screen flex-2 '}>
        <div className="md:static min-h-[85px] flex flex-col justify-center bg-moYellow w-full ">
          <Navbar />
        </div>
        <SubNav />
        <div>
          {themeSettings && <ThemeSettings />}
          {children}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
