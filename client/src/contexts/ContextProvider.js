import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import baseURL from '../url';

const StateContext = createContext();

const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};

export const ContextProvider = ({ children }) => {
  const [authPopup, setAuthPopup] = useState(false);
  const [screenSize, setScreenSize] = useState(undefined);
  const [currentColor, setCurrentColor] = useState('#03C9D7');
  const [currentMode, setCurrentMode] = useState('Light');
  const [themeSettings, setThemeSettings] = useState(false);
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);

  const setMode = (e) => {
    setCurrentMode(e.target.value);
    localStorage.setItem('themeMode', e.target.value);
  };

  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem('colorMode', color);
  };
  // Blog Posts State
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchData = async () => {
    try {
      const result = await axios.get(`${baseURL}/api/blog-posts?page=${page}`);
      setPosts(result.data.data);
      setTotalPages(result.data.totalPages); // set total pages
    } catch (error) {
      console.log(error.message);
    }
  };

  const [webinars, setWebinars] = useState([]);
  const [error, setError] = useState(null);

  async function fetchWebinars() {
    console.log('Fetching webinars...');
    console.log(`${baseURL}/api/webinars`);
    try {
      const response = await axios.get(`${baseURL}/api/webinars`);
      setWebinars(response.data.webinars || []);
    } catch (error) {
      console.error('Error fetching webinars:', error);
      setError('Failed to fetch webinars. Please try again later.');
    }
  }

  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    fetchWebinars();
  }, []);

  const handleClick = (clicked) => setIsClicked({ ...initialState, [clicked]: true });

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <StateContext.Provider
      value={{
        currentColor,
        currentMode,
        activeMenu,
        screenSize,
        setScreenSize,
        handleClick,
        isClicked,
        initialState,
        setIsClicked,
        setActiveMenu,
        setCurrentColor,
        setCurrentMode,
        setMode,
        setColor,
        themeSettings,
        setThemeSettings,
        authPopup,
        setAuthPopup,
        posts,
        setPage,
        totalPages,
        page,
        webinars,
        error,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
