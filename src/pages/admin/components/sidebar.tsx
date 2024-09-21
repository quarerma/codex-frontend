import { Link } from 'react-router-dom';
import { FaHome, FaTools, FaUser, FaBabyCarriage } from 'react-icons/fa';
import { GiMagicSwirl, GiWarAxe, GiSwordwoman, GiNotebook, GiMedicines } from 'react-icons/gi';
import { RiLogoutBoxLine, RiDashboardFill } from 'react-icons/ri';
import { TbSwords, TbSword } from 'react-icons/tb';
import { LuDices } from 'react-icons/lu';
import { BsMagic } from 'react-icons/bs';
import { useState } from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';
import { useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';

export default function Sidebar() {
  const linksMap = [
    {
      name: 'Home Page',
      imageComponent: <FaHome />,
      url: '/',
    },
    {
      name: 'Usuários',
      url: '/admin/users',
      imageComponent: <FaUser />,
    },
    {
      name: 'Campanhas',
      url: '/admin/campaigns',
      imageComponent: <LuDices />,
    },
    {
      name: 'Personagens',
      url: '/admin/characters',
      imageComponent: <GiSwordwoman />,
    },
    {
      name: 'Perícias',
      url: '/admin/skills',
      imageComponent: <GiNotebook />,
    },
    {
      name: 'Origens',
      url: '/admin/origins',
      imageComponent: <FaBabyCarriage />,
    },
    {
      name: 'Classes',
      url: '/admin/classes',
      imageComponent: <TbSwords />,
    },
    {
      name: 'Sub classes',
      url: '/admin/subclasses',
      imageComponent: <TbSword />,
    },
    {
      name: 'Equipamentos',
      url: '/admin/equipments',
      imageComponent: <GiWarAxe />,
    },
    {
      name: 'Modificações',
      url: '/admin/modifications',
      imageComponent: <FaTools />,
    },
    {
      name: 'Poderes',
      url: '/admin/feats',
      imageComponent: <GiMagicSwirl />,
    },
    {
      name: 'Rituais',
      url: '/admin/rituals',
      imageComponent: <BsMagic />,
    },
    {
      name: 'Condições',
      url: '/admin/conditions',
      imageComponent: <GiMedicines />,
    },
  ];

  const queryClient = useQueryClient();
  const handleLogOut = () => {
    // empty all queries
    queryClient.clear();

    Cookies.remove('jwt');
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div
      style={{
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
      }}
      className={`${
        isSidebarOpen ? 'w-96' : 'w-[120px]'
      } max-h-screen relative overflow-y-scroll duration-500   bg-dark-bg-secondary font-oswald border-r-4 border-border text-foreground`}
    >
      <div className={`absolute right-0 items-center z-50 px-5 py-3 duration-300 ${isSidebarOpen ? 'rotate-180' : ''}`}>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-3xl">
          <FaArrowRightLong />
        </button>
      </div>
      <div className="flex flex-col bg-dark-bg-secondary items-center mt-5 gap-y-2 justify-center sticky top-0">
        {isSidebarOpen ? (
          <Link to={'/admin/dashboard'} className="text-center   hover:text-primary text-3xl font-bold">
            Dashboard
          </Link>
        ) : (
          <RiDashboardFill className="text-5xl mt-5 mb-5  hover:text-primary" />
        )}
        <div className="w-11/12 h-[2px] bg-border"></div>
      </div>
      {isSidebarOpen ? (
        <div className="flex flex-col  mt-10 gap-y-10 px-5">
          {linksMap.map((link, index) => (
            <Link
              key={index}
              to={link.url}
              className="text-2xl hover:text-primary flex items-center  gap-x-2 font-semibold transition-colors duration-200"
            >
              {link.imageComponent}
              {link.name}
            </Link>
          ))}
          <Link
            to={'/login'}
            onClick={handleLogOut}
            className="flex items-center gap-x-2  mt-10 mb-10 text-2xl duration-300 transition-colors hover:text-primary-foreground font-semibold  "
          >
            <RiLogoutBoxLine /> Sair
          </Link>
        </div>
      ) : (
        <div className="flex flex-col justify-center text-[2.35rem] items-center mt-10 gap-y-10 px-5">
          {linksMap.map((link, index) => (
            <Link
              key={index}
              to={link.url}
              className=" hover:text-primary flex items-center  gap-x-2 font-semibold transition-colors duration-200"
            >
              {link.imageComponent}
            </Link>
          ))}
          <Link
            to={'/login'}
            onClick={handleLogOut}
            className="flex items-center gap-x-2  mt-10 mb-10  duration-300 transition-colors hover:text-primary-foreground font-semibold  "
          >
            <RiLogoutBoxLine />
          </Link>
        </div>
      )}
    </div>
  );
}
