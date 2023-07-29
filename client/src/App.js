import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { Navbar, Footer, Sidebar, ThemeSettings } from './components';
import { Ecommerce } from './pages';
import './App.css';

import { useStateContext } from './contexts/ContextProvider';
import Login from './pages/Auth/Login.js';
import SettingsIcon from './components/SettingsIcon';
import Layout from './components/Layout/Layout';
import PrivateRoutes from './components/PrivateRoutes/PrivateRoutes';
import PublicRoutes from './components/PublicRoutes/PublicRoutes';
import Register from './pages/Auth/Register';
import { useAuthStateContext } from './contexts/AuthContext';
import PasswordReset from './pages/Auth/PasswordReset';

import baseURL from './url';
import Ticketing from './components/Tickets/TicketList';

const App = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, themeSettings } =
    useStateContext();
  const { setIsLoggedIn } = useAuthStateContext();

  console.log('NAME: ', baseURL);

  // useEffect function to handle messages from the OAuth window
  useEffect(() => {
    if (sessionStorage.getItem('isLoggedIn') === 'true') {
      setIsLoggedIn(true);
    }
    const handleMessage = (event) => {
      // Replace with your expected origin
      // const expectedOrigin = 'http://localhost:3000'
      const expectedOrigin = 'https://seahorse-app-847hs.ondigitalocean.app';

      if (event.origin !== expectedOrigin) {
        console.warn('Received message from untrusted origin, ignoring.');
        return;
      }

      if (event.data.command === 'close') {
        window.close();
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (
    <BrowserRouter>
      <div className={currentMode === 'Dark' ? 'dark h-full' : 'h-full'}>
        <Routes>
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/login" element={<PublicRoutes />}>
            <Route index element={<Login />} />
          </Route>
          <Route path="/register" element={<PublicRoutes />}>
            <Route index element={<Register />} />
          </Route>
          <Route path="/password-reset" element={<PublicRoutes />}>
            <Route index element={<PasswordReset />} />
          </Route>

          <Route
            path="*"
            element={
              <PrivateRoutes activeMenu={activeMenu} themeSettings={themeSettings}>
                <Routes>
                  <Route path="/" element={<Ticketing />} />
                </Routes>
              </PrivateRoutes>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
