// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// // import authService from '../redux/features/auth/authService';
// import headquarterService from '../redux/features/headQuarter/headquarterService';

// const { useNavigate } = require('react-router-dom');

// const useRedirectLoggedOutUser = (path) => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     let isLoggedIn;
//     const redirectLoggedOutUser = async () => {
//       try {
//         isLoggedIn = await headquarterService.getHeadquarterLoginStatus();
//       } catch (error) {
//         console.log(error.message);
//       }

//       if (!isLoggedIn) {
//         toast.info('Session expired, please login to continue');
//         navigate(path);
//         return;
//       }
//     };
//     redirectLoggedOutUser();
//   }, [path, navigate]);
// };

// export default useRedirectLoggedOutUser;

// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { useSelector } from 'react-redux'; // Import useSelector
// import { selectisHqLoggedIn } from '../redux/features/headQuarter/headquarterSlice'; // Import selector

// const useRedirectLoggedOutUser = (path) => {
//   const navigate = useNavigate();
//   // const isLoggedIn = useSelector(selectisHqLoggedIn); // Get login status from Redux
//   // const { HQAdmin } = useSelector((state) => state.headquarter);

//   const { isHqLoading, isHqLoggedIn, HQAdmin, isHqSuccess, isError } = useSelector((state) => state.headquarter);

//   // const { HQAdmin }
//   useEffect(() => {
//     if (HQAdmin === null && !isHqLoggedIn) {
//       toast.info('Session expired, please login to continue');
//       navigate(path); // Redirect to login if not logged in
//     }
//   }, [isHqLoggedIn, path, navigate]); // Re-run effect if login status or path changes
// };

// export default useRedirectLoggedOutUser;
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux'; // Import useSelector
import { selectisHqLoggedIn } from '../redux/features/headQuarter/headquarterSlice'; // Import selector

const useRedirectLoggedOutUser = (path) => {
  const navigate = useNavigate();
  const { isHqLoggedIn, HQAdmin } = useSelector((state) => state.headquarter);
  const token = localStorage.getItem('token'); // Check if token is in localStorage

  useEffect(() => {
    // Check session in localStorage or Redux state
    if (!isHqLoggedIn && !HQAdmin && !token) {
      toast.info('Session expired, please login to continue');
      navigate(path);
    }
  }, [isHqLoggedIn, HQAdmin, token, path, navigate]);
};

export default useRedirectLoggedOutUser;
