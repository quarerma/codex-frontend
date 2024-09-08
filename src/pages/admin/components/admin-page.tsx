import { useNavigate } from 'react-router-dom';
import { getUserById } from '../../../api/fetch/user';
import { useEffect } from 'react';
import Sidebar from './sidebar';
import { useQuery } from '@tanstack/react-query';

export default function AdminPageSetup({ children }: React.PropsWithChildren) {
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
    <div className="max-w-screen font-oswald  min-h-screen bg-dark-bg text-foreground flex">
      <Sidebar />
      <div className="w-full max-h-screen overflow-auto">{children}</div>
    </div>
  );
}
