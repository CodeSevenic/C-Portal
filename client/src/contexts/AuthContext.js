import React, { useState, createContext, useContext, useEffect } from 'react';
import { loginWithEmailAndPassword } from '../firebase/firebase';
import baseURL from '../url';
import { formatDistanceToNow, parseISO, set } from 'date-fns';
import axios from 'axios';
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userData, setUserData] = useState({});
  const [loadingTickets, setLoadingTickets] = useState(false);

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
        sessionStorage.setItem('email', data.email);

        setIsLoggedIn(true);

        // Check if user is admin
        if (data.isAdmin === 'true') {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }

        fetchTickets(data.email);

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

  const [tickets, setTickets] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [filteredTickets, setFilteredTickets] = useState([]);

  useEffect(() => {
    fetchTickets(sessionStorage.getItem('email'));
  }, []);

  const fetchTickets = async (email) => {
    setLoadingTickets(true);
    try {
      const response = await axios.get(`${baseURL}/api/tickets?email=${email}`);
      if (response.data.results) {
        const reshapedData = response.data.results.map((ticket) => ({
          id: `#${ticket.id}`,
          subject: ticket.properties.subject,
          created: new Date(ticket.properties.createdate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
          lastActivity:
            formatDistanceToNow(parseISO(ticket.properties.hs_lastmodifieddate)) + ' ago',
          status:
            ticket.properties.hs_pipeline_stage === '94647558'
              ? 'Open'
              : ticket.properties.hs_pipeline_stage === '94647559'
              ? "Pending Customer's Reply"
              : ticket.properties.hs_pipeline_stage === '94647560'
              ? "Pending MO's Reply"
              : 'Closed',
        }));
        setTickets(reshapedData);
        setLoadingTickets(false);
      } else {
        setLoadingTickets(false);
        throw new Error('No results found.');
      }
    } catch (error) {
      setLoadingTickets(false);
      console.log(error);
    }
  };

  useEffect(() => {
    const filterTickets = () => {
      if (statusFilter === 'all') {
        setFilteredTickets(tickets);
      } else {
        setFilteredTickets(tickets.filter((ticket) => ticket.status === statusFilter));
      }
    };
    filterTickets();
  }, [tickets, statusFilter]);

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
        filteredTickets,
        setStatusFilter,
        fetchTickets,
        loadingTickets,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthStateContext = () => useContext(AuthContext);
