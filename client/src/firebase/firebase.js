// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  getIdToken,
  sendPasswordResetEmail,
} from 'firebase/auth';

// Your web app's Firebase configuration
//
const firebaseConfig = {
  apiKey: 'AIzaSyDAU1741eLBGchQL1BNFEFZcobWG6y6C28',
  authDomain: 'customer-portal-5342a.firebaseapp.com',
  projectId: 'customer-portal-5342a',
  storageBucket: 'customer-portal-5342a.appspot.com',
  messagingSenderId: '904328073999',
  appId: '1:904328073999:web:55dd4905cfd797b95be47a',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

// Handle login with email and password
const loginWithEmailAndPassword = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const idToken = await getIdToken(userCredential.user);
  return idToken;
};

// Handle password reset
const handlePasswordResetEmail = async (email) => {
  let success = false;
  try {
    await sendPasswordResetEmail(auth, email);
    success = true;
    return success;
  } catch (error) {
    console.error(error);
    throw new Error('Error sending email, make sure email is correct');
  }
};

export { loginWithEmailAndPassword, handlePasswordResetEmail };

export default app;
