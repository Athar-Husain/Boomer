import { createBrowserRouter } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

// Routes
import MainRoutes from './MainRoutes';
import LoginRoutes from './AuthenticationRoutes';

const router = createBrowserRouter(
  [
    {
      element: <PrivateRoute />,
      children: [MainRoutes]
    },
    LoginRoutes
  ],
  // {
  //   basename: '/admin'  // ✅ Add this line
  // }
);

export default router;
