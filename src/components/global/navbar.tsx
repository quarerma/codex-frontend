import { useQuery } from '@tanstack/react-query';
import { Link, useLocation } from 'react-router-dom';
import { getUserById } from '../../api/fetch/user';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { ProfileModal } from './profile-modal';

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

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: async () => getUserById(),
  });

  function validateUser() {
    const jwt = Cookies.get('jwt');
    if (!jwt) {
      window.location.href = '/login';
    }
  }

  validateUser();
  return (
    <>
      <div className="w-screen h-[100px] font-semibold text-foreground items-center px-20 text-[1.9rem] font-inter sticky top-0 bg-dark-bg-secondary border-b-[1px] border-primary flex justify-between">
        <Link to={'/'} className=" text-5xl font-extrabold tracking-widest  hover:text-primary-foreground duration-300">
          CODEX
        </Link>

        {linksMap.map((link, index) => (
          <Link key={index} to={link.url} className={` hover:text-primary duration-300 l `}>
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
      </div>
    </>
  );
}
