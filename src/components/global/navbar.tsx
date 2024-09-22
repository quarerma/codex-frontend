import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Link, useLocation } from 'react-router-dom';
import { getUserById } from '../../api/fetch/user';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { ProfileModal } from './profile-modal';
import { authToken } from '../../api/auth/authorization';

export default function Navbar() {
  const location = useLocation();

  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
  const linksMap = [
    {
      name: 'Campanhas',
      url: '/campaigns',
    },
    {
      name: 'Personagens',
      url: '/characters',
    },
  ];

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
        console.log('JWT INVÁLIDO');
        localStorage.removeItem('jwt');
        window.location.href = '/login';
        return false;
      }
    },
    enabled: !!token,
  });

  useEffect(() => {
    if (!token) {
      window.location.href = '/login';
    }
  }, [token]);

  if (isUserLoading || isAuthLoading) {
    return (
      <div className="w-screen min-h-screen font-oswald bg-dark-bg space-y-5">
        <div className="flex justify-center items-center h-[70vh] space-x-5">
          <h1 className="text-white/30 font-semibold tracking-widest text-3xl">Loading</h1>
          <div className="w-10 h-10 border-b-2 border-l-2 border-primary rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!user || !isAuthenticated) {
    return (
      <div className="w-screen min-h-screen font-oswald bg-dark-bg space-y-5">
        <div className="flex justify-center items-center h-[70vh] space-x-5">
          <h1 className="text-white/30 font-semibold tracking-widest text-3xl">
            Você não tem permissão para acessar essa página
          </h1>
        </div>
      </div>
    );
  }
  return (
    <header className="sticky top-0 w-screen h-[8vh] font-semibold text-foreground items-center px-20 text-[1.9rem] font-oswald bg-dark-bg-secondary border-b-[1px] border-primary flex justify-between">
      <Link to={'/'} className="text-5xl font-extrabold tracking-widest hover:text-primary-foreground duration-300">
        CODEX
      </Link>

      {linksMap.map((link, index) => (
        <Link key={index} to={link.url} className={`hover:text-primary duration-300 l`}>
          {link.name}
          {location.pathname === link.url && (
            <div className="w-full flex justify-center">
              <div className="w-11/12 justify-center h-[3px] rounded-3xl bg-primary"></div>
            </div>
          )}
        </Link>
      ))}
      {user?.role === 'ADMIN' && (
        <Link to={'/admin/dashboard'} className="hover:text-primary duration-300">
          Gerenciar
        </Link>
      )}
      <div
        onClick={() => setIsProfileModalVisible(!isProfileModalVisible)}
        className="flex items-center h-full cursor-pointer justify-center gap-x-5"
      >
        <div className="w-[1px] h-[60%] bg-primary"></div>
        <span className="hover:text-primary text-2xl">{user?.username}</span>
        <div className="w-12 h-12 rounded-full bg-primary"></div>
        {user && (
          <div className="w-fit">
            <ProfileModal
              isOpen={isProfileModalVisible}
              onRequestClose={() => setIsProfileModalVisible(false)}
              user={user}
            />
          </div>
        )}
      </div>
    </header>
  );
}
