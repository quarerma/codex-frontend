import { Link } from 'react-router-dom';

import Modal from 'react-modal';
import { RiLogoutBoxLine } from 'react-icons/ri';
import { LuUser2 } from 'react-icons/lu';
import { User } from '../../types/user';
import Cookies from 'js-cookie';
import { useQueryClient } from '@tanstack/react-query';

interface ProfileModalProps {
  isOpen: boolean;
  user: User;
  onRequestClose: () => void;
}

export const ProfileModal = ({ user, isOpen, onRequestClose }: ProfileModalProps) => {
  const queryClient = useQueryClient();

  const handleLogOut = () => {
    // empty all queries
    queryClient.clear();

    Cookies.remove('jwt');
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="mt-20 z-50 right-0 fixed bg-dark-bg-secondary mr-10 border-2 border-border rounded-lg  flex flex-col " // Conteúdo do modal com fundo transparente
      style={{
        overlay: {
          backgroundColor: 'rgba(255, 255, 255, 0)', // Overlay transparente
        },
        content: {
          WebkitOverflowScrolling: 'touch',
        },
      }}
    >
      <div className="text-foreground text-2xl  w-fit flex flex-col p-3 rounded-lg gap-y-3  ">
        <h1 className="text-2xl font-bold">{user.username}</h1>
        <div className="w-full h-[2px] bg-muted"></div>

        <Link to="/profile" className="flex gap-x-2">
          <div className="justify-center items-center hover:scale-110 duration-300 flex gap-x-2">
            <LuUser2 className="mt-1 font-extrabold text-3xl" />
            <span>Perfil</span>
          </div>
        </Link>
        <Link to="/login" className="flex gap-x-2" onClick={handleLogOut}>
          <div className="justify-center items-center hover:scale-110 duration-300 flex gap-x-3">
            <RiLogoutBoxLine className="mt-1 " />
            <span>Sair</span>
          </div>
        </Link>
      </div>
    </Modal>
  );
};
