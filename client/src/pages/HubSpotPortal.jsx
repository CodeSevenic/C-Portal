import React, { useEffect, useState } from 'react';
import { GoDotFill } from 'react-icons/go';
import { PiPlugBold, PiPlugsConnectedBold } from 'react-icons/pi';
import { useParams } from 'react-router-dom';
import FeatureToggle from '../components/FeatureToggle/FeatureToggle';
import Popup from '../components/Popup/Popup';
import { useAuthStateContext } from '../contexts/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import DeletingAccountLoading from '../components/LoadingSpinner/deletingAccount';
import baseURL from '../url';

const HubSpotPortal = () => {
  return <> </>;
};

export default HubSpotPortal;
