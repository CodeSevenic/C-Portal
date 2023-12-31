import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { useStateContext } from './contexts/ContextProvider';
import Login from './pages/Auth/Login.js';
import Register from './pages/Auth/Register';
import PrivateRoutes from './components/PrivateRoutes/PrivateRoutes';
import PublicRoutes from './components/PublicRoutes/PublicRoutes';
import { useAuthStateContext } from './contexts/AuthContext';
import PasswordReset from './pages/Auth/PasswordReset';
import Ticketing from './components/Tickets/TicketList';
import HubSpotForm from './components/HubSpotForm/HubSpotForm';
import BlogPosts from './components/BlogPosts/BlogPosts';
import Webinars from './components/Webinars/Webinars';
import './App.css';

const App = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, themeSettings } =
    useStateContext();
  const { setIsLoggedIn } = useAuthStateContext();

  // useEffect function to handle messages from the OAuth window
  useEffect(() => {
    if (sessionStorage.getItem('isLoggedIn') === 'true') {
      setIsLoggedIn(true);
    }
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
                  <Route path="/log-ticket" element={<HubSpotForm />} />
                  <Route path="/resources" element={<BlogPosts />} />
                  <Route path="/webinars" element={<Webinars />} />
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
