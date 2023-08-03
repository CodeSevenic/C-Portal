import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Link } from 'react-router-dom';
import MODude from '../../assets/images/MO-Yellow-Dude.webp';
import Logo from '../../assets/images/MO-Logo.svg';
import Y_axis_logo from '../../assets/images/YoboDataLogo.png';
import { useAuthStateContext } from '../../contexts/AuthContext';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import Footer from '../../components/Footer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loadingSpinner, setLoadingSpinner] = useState(false);

  const { login } = useAuthStateContext();

  const handleSubmit = async (e) => {
    setLoadingSpinner(true);
    console.log('handleSubmit login');
    // store email on session storage
    e.preventDefault();
    try {
      const response = await login(email, password);
      console.log('response: ', response);
      toast.success(response.data.message);
      if (response.isLoggedIn) {
        setLoadingSpinner(false);
        return;
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
        setLoadingSpinner(false);
      } else {
        toast.error('Wrong Password or Email');
        setLoadingSpinner(false);
      }
    }
  };
  const classLabel = 'block font-medium text-gray-700 mb-2';
  const classInput =
    'p-2 border bg-slate-100 border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-transparent';

  return (
    <div className="bg-moYellow h-full">
      <div className="overflow-x-hidden relative h-full">
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />

        <div className="grid grid-cols-2 max-w-5xl mx-auto h-full ">
          <div className="my-auto mr-32 relative">
            {loadingSpinner && <LoadingSpinner />}
            <img
              className="mx-auto mb-8"
              width={250}
              height={100}
              src={Logo}
              alt="MO Customer Portal Logo"
            />
            <p className="text-gray-500 text-sm font-semibold mb-5 text-center">
              Enter your email and password to log in
            </p>
            <form onSubmit={handleSubmit} autoComplete="off">
              <div className="flex flex-col mb-8">
                <label className={`${classLabel} `} htmlFor="email">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="off"
                  className={`${classInput}`}
                />
              </div>
              <div className="flex flex-col mb-14">
                <label className={`${classLabel} `} htmlFor="password">
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  className={`${classInput}`}
                />
              </div>
              <button
                className="bg-moBlue px-5 block py-2 w-full rounded-xl mb-8 font-semibold text-white hover:shadow-lg transition-all duration-300"
                type="submit"
              >
                Login
              </button>
            </form>
            <div className="flex gap-5 justify-center mb-8">
              <Link to={'/password-reset'}>
                <button className="text-btn2 font-medium">Forgot Password</button>
              </Link>
            </div>
            {/* <div className="flex gap-5 justify-center">
              <p className="font-semibold text-gray-500">Don't have an account?</p>
              <Link to={'/register'}>
                <button className="text-moBlue font-medium">Register</button>
              </Link>
            </div> */}
          </div>

          <div className="relative overflow-hidden flex items-center">
            <img src={MODude} alt="MO Rider" className="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
