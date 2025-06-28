// import { createBrowserRouter } from 'react-router-dom';

// // routes
// import MainRoutes from './MainRoutes';
// import LoginRoutes from './AuthenticationRoutes';

// // ==============================|| ROUTING RENDER ||============================== //
// const router = createBrowserRouter([MainRoutes, LoginRoutes], {
//   basename: import.meta.env.VITE_APP_BASE_NAME
// });

// export default router;

import { createBrowserRouter } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

// Routes
import MainRoutes from './MainRoutes';
import LoginRoutes from './AuthenticationRoutes';


const router = createBrowserRouter([
  {
    element: <PrivateRoute />, // Protect these routes
    children: [MainRoutes] // Only accessible when logged in
  },
  LoginRoutes // Public routes
]);

export default router;



