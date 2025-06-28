import { useSelector } from 'react-redux';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
// import { selectisHqLoggedIn } from '../redux/features/headQuarter/headquarterSlice';
import MainRoutes from './MainRoutes';
// import { selectisHqLoggedIn } from 'redux/features/headQuarter/headquarterSlice';

// const PrivateRoute = () => {
//   // const isHqLoggedIn = useSelector(selectisHqLoggedIn);
//   const { Admin, isLoggedIn } = useSelector((state) => state.Admin);

//   // console.log('console in private routes ', Admin, isLoggedIn);

 

// //  if (isLoggedIn && Admin !== null) {
// //   user = Admin
// //  }
// //  console.log("user in Private Route", user)

//   return Admin != null ? <Outlet /> : <Navigate to="/login" />;
//   // return isHqLoggedIn ? <MainRoutes /> : <Navigate to="/login" />;
// };



const PrivateRoute = () => {
  
  const navigate = useNavigate();
  
  let token = localStorage.getItem('token');
  // Get `Admin` and `isLoggedIn` from the Redux state
  const { Admin, isLoggedIn } = useSelector((state) => state.Admin);


  // console.log("Admin, Loggedin", Admin, isLoggedIn)
  // Check if the user is logged in and has a valid `Admin` object

  // if (!token) {
  //     navigate("/login")
  //   }

  if (!isLoggedIn && !token ) {
    return <Navigate to="/login" />; // Redirect to login page if not logged in or Admin is null
  } else {
    return <Outlet />; // Allow access to the route
  }
};

export default PrivateRoute;


// import { Navigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// const PrivateRoute = ({ children }) => {
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  
//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };

// export default PrivateRoute;



