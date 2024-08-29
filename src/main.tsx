import ReactDOM from 'react-dom/client';

import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import LoginPage from './pages/login/login';
import SignUpPage from './pages/signup/signup';
import HomePage from './pages/home/home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AdminLandingPage from './pages/admin/landing';
import ViewCampaigns from './pages/view-campaigns/view-campaigns';
import ViewCharacters from './pages/view-characters/view-character';
import CreateCampaign from './pages/create-campaign/create-campaign';
import ManageUsers from './pages/admin/user/manage-users';
import ManageClasses from './pages/admin/classes/manage-classes';
import ManageSubclasses from './pages/admin/subclasses/manage-subclasses';
import ManageFeats from './pages/admin/feats/manage-feats';
import ManageSkills from './pages/admin/skills/manage-skills';

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
  {
    path: '/campaigns',
    element: (
      <QueryClientProvider client={queryClient}>
        <ViewCampaigns />
      </QueryClientProvider>
    ),
  },
  {
    path: '/admin/dashboard',
    element: (
      <QueryClientProvider client={queryClient}>
        <AdminLandingPage />
      </QueryClientProvider>
    ),
  },
  {
    path: '/characters',
    element: (
      <QueryClientProvider client={queryClient}>
        <ViewCharacters />
      </QueryClientProvider>
    ),
  },
  {
    path: '/create-campaign',
    element: (
      <QueryClientProvider client={queryClient}>
        <CreateCampaign />
      </QueryClientProvider>
    ),
  },
  {
    path: '/admin/users',
    element: (
      <QueryClientProvider client={queryClient}>
        <ManageUsers />
      </QueryClientProvider>
    ),
  },
  {
    path: '/admin/classes',
    element: (
      <QueryClientProvider client={queryClient}>
        <ManageClasses />
      </QueryClientProvider>
    ),
  },
  {
    path: '/admin/subclasses',
    element: (
      <QueryClientProvider client={queryClient}>
        <ManageSubclasses />
      </QueryClientProvider>
    ),
  },
  {
    path: '/admin/feats',
    element: (
      <QueryClientProvider client={queryClient}>
        <ManageFeats />
      </QueryClientProvider>
    ),
  },
  {
    path: '/admin/skills',
    element: (
      <QueryClientProvider client={queryClient}>
        <ManageSkills />
      </QueryClientProvider>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />);
