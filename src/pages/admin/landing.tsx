import { useQuery } from '@tanstack/react-query';

import { useNavigate } from 'react-router-dom';
import { getUserById } from '../../api/auth/user';
import { useEffect } from 'react';
import Sidebar from './components/sidebar';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
/* <ReactQueryDevtools initialIsOpen={false} /> */
export default function AdminLandingPage() {
  // check if user is admin

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUserById(),
  });

  // check using useMutation
  useEffect(() => {
    if (user === undefined) return;
    if (user?.role !== 'ADMIN') {
      alert('You are not an admin');

      // redirect
      const navigate = useNavigate();
      navigate('/');
    }
  }, [user]);

  return (
    <div className="max-w-screen  min-h-screen bg-dark-bg text-foreground flex">
      <Sidebar />
    </div>
  );
}
