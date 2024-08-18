import ReactDOM from 'react-dom/client';

import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import './index.css';
import LoginPage from './pages/login/login';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: (
      // redirect to login page
      <Navigate to="/login" replace />
    ),
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />,
);
