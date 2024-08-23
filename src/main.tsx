import ReactDOM from 'react-dom/client';

import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import LoginPage from './pages/login/login';
import SignUpPage from './pages/signup/signup';
import HomePage from './pages/home/home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchInterval: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      staleTime: Infinity, //
      retry: 5,
      gcTime: 1000 * 60 * 5,
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '*',
    element: (
      // redirect to login page
      <Navigate to="/login" replace />
    ),
  },
  {
    path: '/signup',
    element: <SignUpPage />,
  },
  {
    path: '/',
    element: (
      <QueryClientProvider client={queryClient}>
        <HomePage />
      </QueryClientProvider>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />);
