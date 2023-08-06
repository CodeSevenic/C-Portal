import React, { useState, createContext, useContext } from 'react';
import { loginWithEmailAndPassword } from '../firebase/firebase';
import baseURL from '../url';
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userData, setUserData] = useState({});

  const login = async (email, password) => {
    console.log('Login: email: ', email);

    const idToken = await loginWithEmailAndPassword(email, password);

    console.log('AuthContext: ', process.env.REACT_APP_FIREBASE_API_KEY);
    try {
      localStorage.removeItem('prevUrl');
      console.log('Login: email: ', email);
      const response = await fetch(`${baseURL}/api/login`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      });

      if (response.ok) {
        const data = await response.json();
        // Perform other actions, like updating the state, redirecting to another page, etc.
        console.log('Login: Successfully went through!!!');
        console.log('Login: ', data);

        setUserData(data);
        // start by clearing sessionStorage
        sessionStorage.clear();
        // then set sessionStorage
        sessionStorage.setItem('userId', data.userId);
        sessionStorage.setItem('isAdmin', data.isAdmin);
        sessionStorage.setItem('username', data.username);
        sessionStorage.setItem('isLoggedIn', data.isLoggedIn);

        setIsLoggedIn(true);

        // Check if user is admin
        if (data.isAdmin === 'true') {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }

        return data.userId;
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      // Handle Firebase or server errors
      console.error(error);
    }
  };

  const register = async (username, email, password, phone) => {
    localStorage.removeItem('prevUrl');
    console.log('Register: email: ', email);
    const response = await fetch(`${baseURL}/api/register`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password, phone }),
    });

    console.log(response);

    if (response.ok) {
      const data = await response.json();
      // Perform other actions, like updating the state, redirecting to another page, etc.
      setUserData(data);
      // start by clearing sessionStorage
      sessionStorage.clear();
      // then set sessionStorage
      sessionStorage.setItem('userId', data.userId);
      sessionStorage.setItem('isAdmin', data.isAdmin);
      sessionStorage.setItem('username', data.username);
      sessionStorage.setItem('isLoggedIn', data.isLoggedIn);

      console.log('Register: Successfully went through!!!');
      return data;
    } else {
      const data = await response.json();
      return data;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        register,
        isAdmin,
        isLoggedIn,
        setIsAdmin,
        setIsLoggedIn,
        userData,
        setUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthStateContext = () => useContext(AuthContext);
