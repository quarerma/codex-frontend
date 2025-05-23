import { useNavigate } from 'react-router-dom';
import { getUserById } from '../../../api/fetch/user';
import { useEffect } from 'react';
import Sidebar from './sidebar';
import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';

export default function AdminPageSetup({ children }: React.PropsWithChildren) {
  const navigate = useNavigate();

  const token: string | undefined = Cookies.get('jwt');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: getUserById,
    enabled: !!token,
  });

  useEffect(() => {
    if (!isLoading && user) {
      if (user.role !== 'ADMIN') {
        alert('You are not an admin');
        navigate('/');
      }
    }
  }, [user, isLoading, navigate]);

  if (isLoading || !token) {
    return (
      <div className="w-screen min-h-screen  bg-dark-bg space-y-5">
        <div className="flex justify-center items-center h-[70vh] space-x-5">
          <h1 className="text-white/30 font-semibold tracking-widest text-5xl">Loading</h1>
          <div className="w-10 h-10 border-b-2 border-l-2 border-primary rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-screen  max-h-screen bg-dark-bg text-foreground flex">
      <Sidebar />
      <div className="w-full max-h-screen overflow-y-auto">{children}</div>
    </div>
  );
}
