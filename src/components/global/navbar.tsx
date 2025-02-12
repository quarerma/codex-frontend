import { useQuery } from '@tanstack/react-query';
import { Link, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { ProfileModal } from './profile-modal';
import { getUserById } from '../../api/fetch/user';

export default function Navbar() {
  const location = useLocation();
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);

  const linksMap = [
    { name: 'Campanhas', url: '/campaigns' },
    { name: 'Personagens', url: '/characters' },
  ];

  const token = Cookies.get('jwt');

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: getUserById,
    enabled: !!token,
  });

  return (
    <div>
      {/* Desktop Navbar */}
      <div className="max-lg:hidden">
        <div className="w-screen h-[8vh]"></div>
        <header className="fixed z-50 top-0 w-screen h-[8vh] font-semibold text-foreground items-center px-20 xl:text-[1.9rem] lg:text-[1.6rem]  bg-dark-bg-secondary border-b-[1px] border-primary flex justify-between">
          {/* Brand */}
          <Link to="/" className="xl:text-5xl lg:text-5xl font-extrabold tracking-widest hover:text-primary-foreground duration-300">
            CODEX
          </Link>

          {/* Links */}
          {linksMap.map((link, index) => (
            <Link key={index} to={link.url} className={`hover:text-primary text-4xl duration-300 ${location.pathname === link.url ? 'font-bold' : ''}`}>
              {link.name}
              {location.pathname === link.url && (
                <div className="w-full flex justify-center">
                  <div className="w-11/12 justify-center h-[3px] rounded-3xl bg-primary"></div>
                </div>
              )}
            </Link>
          ))}

          {/* Admin Link */}
          {user?.role === 'ADMIN' && (
            <Link to="/admin/dashboard" className="hover:text-primary duration-300 text-4xl">
              Gerenciar
            </Link>
          )}

          {/* Profile */}
          <div onClick={() => setIsProfileModalVisible(!isProfileModalVisible)} className="flex items-center h-full cursor-pointer justify-center gap-x-5">
            <div className="w-[1px] h-[60%] bg-primary"></div>
            <span className="hover:text-primary   text-5xl">{user?.username}</span>
            <div className="w-12 h-12 rounded-full bg-primary"></div>
            {user && (
              <div className="w-fit">
                <ProfileModal isOpen={isProfileModalVisible} onRequestClose={() => setIsProfileModalVisible(false)} user={user} />
              </div>
            )}
          </div>
        </header>
      </div>

      {/* Mobile Navbar */}
      <div className="lg:hidden">
        <div className="w-screen h-[6vh]"></div>
        <header className="fixed top-0 w-full h-[6vh] bg-dark-bg-secondary z-50 border-b border-primary px-4 py-2 flex items-center justify-between">
          {/* Brand */}
          <Link to="/" className="text-5xl font-extrabold tracking-widest text-primary duration-300">
            CODEX
          </Link>

          {/* Hamburger Menu Icon */}
          <button className="text-primary focus:outline-none" aria-label="Open Menu">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </header>
      </div>
    </div>
  );
}
