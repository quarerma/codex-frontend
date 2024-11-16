import { useQuery } from '@tanstack/react-query';
import { cn } from '../../../lib/utils'; // ShadCN utility for combining class names
import { getUserById } from '../../api/fetch/user';
import Navbar from '../global/navbar';
import Cookies from 'js-cookie';
import { authToken } from '../../api/auth/authorization';
import { useEffect } from 'react';

interface PageSetupProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageSetup({ children, className }: PageSetupProps) {
  const token = Cookies.get('jwt');

  const { data: user, isLoading: isUserLoading } = useQuery({
    queryKey: ['user'],
    queryFn: getUserById,
    enabled: !!token,
  });

  const { data: isAuthenticated, isLoading: isAuthLoading } = useQuery({
    queryKey: ['auth'],
    queryFn: async () => {
      try {
        await authToken();
        return true;
      } catch (error) {
        console.error('JWT INVÁLIDO');
        Cookies.remove('jwt');
        window.location.href = '/login';
        return false;
      }
    },
    enabled: !!token,
  });

  useEffect(() => {
    if (!token) window.location.href = '/login';
  }, [token]);

  if (isUserLoading || isAuthLoading) {
    return (
      <div className="w-screen min-h-screen flex justify-center items-center bg-dark-bg text-white">
        <div className="flex items-center justify-center space-x-5 text-center">
          <h1 className="text-3xl font-semibold">Loading...</h1>
          <div className="w-12 h-12 border-b-4 border-r-4 border-primary rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!user || !isAuthenticated) {
    return (
      <div className="w-screen min-h-screen flex justify-center items-center bg-dark-bg text-white">
        <h1 className="text-3xl font-semibold">Você não tem permissão para acessar essa página</h1>
      </div>
    );
  }

  return (
    <div className={cn('max-w-screen min-h-screen font-oswald bg-dark-bg space-y-5', className)}>
      <Navbar />
      <div className={cn('flex flex-col h-full text-foreground 2xl:max-h-[87vh] xl:max-h-[85vh] overflow-y-auto 2xl:px-20  xl:px-10  lg:px-5  px-2 mr-2', className)}>{children}</div>
    </div>
  );
}
