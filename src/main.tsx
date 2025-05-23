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
import ManageOrigins from './pages/admin/origin/manage.origin';
import CreateCharacter from './pages/create-character/create-character';
import ManageRituals from './pages/admin/rituals/manage-rituals';
import ManageConditions from './pages/admin/conditions/manage-conditions';
import CharacterPage from './pages/character-page/character-page';
import ManageEquipments from './pages/admin/equipment/manage-equipment';
import CampaignPage from './pages/campaign-page/campaign-page';
import ManageCampaignSkills from './pages/campaign-page/components/skills/manage-skills';
import ManageCampaignRituals from './pages/campaign-page/components/rituals/manage-rituals';
import ManageCamapignEquipments from './pages/campaign-page/components/equipment/manage-equipment';
import ManageCampaignFeats from './pages/campaign-page/components/feats/manage-feats';
import ManageCampaignPlayers from './pages/campaign-page/components/players';
import { Toaster } from 'sonner';

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
  {
    path: 'admin/origins',
    element: (
      <QueryClientProvider client={queryClient}>
        <ManageOrigins />
      </QueryClientProvider>
    ),
  },
  {
    path: '/admin/rituals',
    element: (
      <QueryClientProvider client={queryClient}>
        <ManageRituals />
      </QueryClientProvider>
    ),
  },
  {
    path: '/admin/conditions',
    element: (
      <QueryClientProvider client={queryClient}>
        <ManageConditions />
      </QueryClientProvider>
    ),
  },
  {
    path: '/admin/equipments',
    element: (
      <QueryClientProvider client={queryClient}>
        <ManageEquipments />
      </QueryClientProvider>
    ),
  },
  {
    path: '/create-character/:campaignId',
    element: (
      <QueryClientProvider client={queryClient}>
        <CreateCharacter />
      </QueryClientProvider>
    ),
  },
  {
    path: '/create-character',
    element: (
      <QueryClientProvider client={queryClient}>
        <CreateCharacter />
      </QueryClientProvider>
    ),
  },
  {
    path: '/campaigns/:id',
    element: (
      <QueryClientProvider client={queryClient}>
        <CampaignPage />
      </QueryClientProvider>
    ),
  },
  {
    path: '/campaigns/:id/equipment',
    element: (
      <QueryClientProvider client={queryClient}>
        <ManageCamapignEquipments />
      </QueryClientProvider>
    ),
  },
  {
    path: '/campaigns/:id/players',
    element: (
      <QueryClientProvider client={queryClient}>
        <ManageCampaignPlayers />
      </QueryClientProvider>
    ),
  },
  {
    path: '/campaigns/:id/rituals',
    element: (
      <QueryClientProvider client={queryClient}>
        <ManageCampaignRituals />
      </QueryClientProvider>
    ),
  },
  {
    path: '/campaigns/:id/skills',
    element: (
      <QueryClientProvider client={queryClient}>
        <ManageCampaignSkills />
      </QueryClientProvider>
    ),
  },
  {
    path: '/campaigns/:id/feats',
    element: (
      <QueryClientProvider client={queryClient}>
        <ManageCampaignFeats />
      </QueryClientProvider>
    ),
  },
  {
    path: '/characters/:id',
    element: (
      <QueryClientProvider client={queryClient}>
        <CharacterPage />
      </QueryClientProvider>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <div className="font-romannew">
      <RouterProvider router={router} /> <Toaster visibleToasts={5} duration={5000} />
    </div>
  </>
);
