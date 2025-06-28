import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
// import HeadquarterForgotPassword from 'views/pages/authentication3/HeadquarterForgotPassword';
import ResetPassword from 'views/pages/authentication/auth-forms/ResetPassword';
import Register from 'views/pages/authentication3/Register';
import ForgotPassword from 'views/pages/authentication3/ForgotPassword';
import Home from 'views/Home/Home';

// login option 3 routing
const Login = Loadable(lazy(() => import('views/pages/authentication3/Login')))
const AuthLogins = Loadable(lazy(() => import('views/pages/authentication3/Logins')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/register',
      element: <Register />
    },
    {
      path: '/forgotpassword',
      element: <ForgotPassword />
    },
    {
      path: '/resetpassword',
      element: <ResetPassword />
    },
    // {
    //   path: '/landing',
    //   // element: <><h2>Landing page</h2></>
    //   element: <><Home /> </>
    // },
    // {
    //   path: '/headquarter/register',
    //   element: <HeadquarterRegister />
    // },
    {
      path: '/logins',
      element: <AuthLogins />
    }
  ]
};

export default AuthenticationRoutes;
