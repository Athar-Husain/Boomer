import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouterProvider, useNavigate } from 'react-router-dom';
// import AppSnackbar from 'views/AppSnackbar';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
// import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import './App.css';

import 'react-toastify/dist/ReactToastify.css';

// routing
import router from 'routes';

// defaultTheme
import themes from 'themes';
import axios from 'axios';
// project imports
import NavigationScroll from 'layout/NavigationScroll';
import { getAdmin, getAdminLoginStatus } from 'redux/features/Admin/adminSlice';
import { getAllCustomers } from 'redux/features/Customers/customerSlice';
// import useRedirectLoggedOutUser from './CustomHook/useRedirectLoggedOutUser';
axios.defaults.withCredentials = true;
// axios.defaults.withCredentials = true;

// ==============================|| APP ||============================== //

const App = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const { isLoggedIn, Admin, } = useSelector((state) => state.Admin);

  useEffect(() => {
    const checkAndFetchHeadquarter = async () => {
      try {
        await dispatch(getAdminLoginStatus()).unwrap(); // Ensure the login status is updated before proceeding
        if (isLoggedIn && !Admin) {
          await dispatch(getAdmin());
        }
      } catch (error) {
        console.error('Error fetching Admin status:', error);
      }
    };

    // Ensure that this only runs if necessary to avoid fetching on every render
    if (isLoggedIn && !Admin) {
      checkAndFetchHeadquarter();
    }
  }, [dispatch, isLoggedIn, Admin]);






  // useEffect(() => {
  //   const checkAndFetchHeadquarter = async () => {
  //     try {
  //       await dispatch(getAdminLoginStatus()).unwrap();
  //       if (!isLoggedIn && !Admin && !token) {
  //         await dispatch(getAdmin());
  //       }
  //     } catch (error) {
  //       console.error('Error fetching headquarter status:', error);
  //     }
  //   };

  //   if (isLoggedIn && !Admin) {
  //     checkAndFetchHeadquarter();
  //   }
  // }, [dispatch, isLoggedIn, Admin]);



  // useEffect(() => {
  //   const checkAndFetchHeadquarter = async () => {
  //     try {
  //       await dispatch(getHeadquarterLoginStatus()).unwrap();
  //       if (isHqLoggedIn && !HQAdmin && !token) {
  //         await dispatch(getHeadquarter());
  //       }
  //     } catch (error) {
  //       console.error('Error fetching headquarter status:', error);
  //     }
  //   };

  //   if (isHqLoggedIn && !HQAdmin) {
  //     checkAndFetchHeadquarter();
  //   }
  // }, [dispatch, isHqLoggedIn, HQAdmin]);


  // console.log('tokenin app js ', toeknn);

  const customization = useSelector((state) => state.customization);

  // console.log('localStorage.token', localStorage.token);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        {/* <AppSnackbar /> */}
        <ToastContainer />
        <CssBaseline />
        <NavigationScroll>
          <RouterProvider router={router} />
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
