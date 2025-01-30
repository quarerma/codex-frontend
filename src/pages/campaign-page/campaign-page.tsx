import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { fetchCampaign, getCampaignCharacters } from '../../api/fetch/campaigns';
import NavBar from '../../components/global/navbar';
import { format } from 'date-fns';

import CharacterCard from './components/char-card';
import { IoIosAddCircleOutline, IoMdCloseCircleOutline } from 'react-icons/io';
import { getUserById } from '../../api/fetch/user';
import { useEffect, useState } from 'react';
import DmCampaignPage from './components/dm-campaign-page';
import PageSetup from '../../components/ui/page-setup';
import socket from '../../api/sockets';
import { toast } from 'sonner';

export default function CampaignPage() {
  const { id: campaignId } = useParams();
  const { data: campaign } = useQuery({
    queryKey: ['campaign', campaignId],
    queryFn: () => fetchCampaign(campaignId),
    enabled: !!campaignId,
  });

  const { data: characters } = useQuery({
    queryKey: ['campaign-characters', campaignId],
    queryFn: () => getCampaignCharacters(campaignId),
    enabled: !!campaignId,
  });

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: getUserById,
  });

  const [isUserValid, setIsUserValid] = useState(false);
  const [isUserDM, setIsUserDM] = useState(false);

  useEffect(() => {
    // Log connection status
    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    // Join the campaign room
    socket.emit('joinCampaignRoom', campaignId);

    // Listen for incoming messages
    socket.on('receiveMessage', (data) => {
      console.log('Received message:', data);
      const toastId = toast('', {
        description: (
          <>
            <div className="font-oswald ">
              <h1 className="text-xl tracking-widest">
                <span className="font-medium">
                  {data.characterName} - {data.label}
                </span>
              </h1>
              <h1 className="text-lg font-semibold">Resultado: {data.result}</h1>
            </div>

            <div className="absolute right-1 top-1 text-xl cursor-pointer hover:scale-105 duration-300" onClick={() => dismissToast(toastId)}>
              <IoMdCloseCircleOutline />
            </div>
          </>
        ),

        closeButton: false,
        cancel: false,

        actionButtonStyle: {
          color: 'text-black',
        },

        onAutoClose(toast) {
          dismissToast(toast.id);
        },

        onDismiss(toast) {
          dismissToast(toast.id);
        },
        classNames: {
          toast: 'bg-dark-bg-secondary border-2 border-white drop-shadow-[0_0px_30px_rgba(255,255,255,100)] text-white  w-full flex flex-1  ', // centers the text
          title: 'font-bold text-xl',
          description: 'font-extralight text-lg',
        },
      });
    });

    function dismissToast(toastId: number | string) {
      toast.dismiss(toastId);
    }

    // Cleanup function to remove the event listener
    return () => {
      socket.off('receiveMessage');
    };
  }, [campaignId]);
  useEffect(() => {
    if (user && campaign) {
      if (user.id === campaign.owner.id) {
        setIsUserValid(true);
        setIsUserDM(true);
      } else {
        const isUserInCampaign = campaign.players.some((player) => player.playerId === user.id);
        if (isUserInCampaign) {
          setIsUserValid(true);
        }
      }
    }
  }, [user, campaign]);

  // Verificação de carregamento e permissões
  if (!characters || !campaign || !user) {
    return (
      <div className="w-screen min-h-screen font-oswald bg-dark-bg space-y-5">
        <NavBar />
        <div className="flex justify-center items-center h-[70vh] space-x-5">
          <h1 className="text-white/30 font-semibold tracking-widest text-3xl">Loading</h1>
          <div className="w-10 h-10 border-b-2 border-l-2 border-primary rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!isUserValid) {
    return (
      <div className="w-screen min-h-screen font-oswald bg-dark-bg space-y-5">
        <NavBar />
        <div className="flex justify-center items-center h-[70vh] space-x-5">
          <h1 className="text-white/30 font-semibold tracking-widest text-3xl">Você não tem permissão para acessar essa página</h1>
        </div>
      </div>
    );
  }

  if (isUserDM) {
    return <DmCampaignPage />;
  }

  const formattedCreatedAt = format(new Date(campaign.createdAt), 'dd/MM/yyyy');

  return (
    <PageSetup>
      <div className="items-center w-fit space-x-32 2xl:text-2xl xl:text-xl text-base h-[5vh] flex">
        <h1 className="text-white/30 font-semibold tracking-widest 2xl:text-4xl xl:text-3xl text-lg">Campaign Page</h1>
        <h1 className="flex items-center gap-x-2 font-extralight">
          <div className="w-2 h-2 rounded-full bg-primary"></div>
          <span className="text-primary font-light">Campanha:</span>
          {campaign.name}
        </h1>
        <h1 className="flex items-center gap-x-2 font-extralight">
          <div className="w-2 h-2 rounded-full bg-primary"></div>
          <span className="text-primary font-light">Mestre:</span>
          {campaign?.owner.id === user?.id ? 'Você' : `${campaign?.owner.username}`}{' '}
        </h1>
        <h1 className="flex items-center gap-x-2 font-extralight">
          <div className="w-2 h-2 rounded-full bg-primary"></div>
          <span className="text-primary font-light">Criada em:</span>
          {formattedCreatedAt}
        </h1>
      </div>
      <div
        className="mt-5 lg:flex flex-col h-[80vh] space-y-10 overflow-x-hidden overflow-y-hidden"
        style={{
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}
      >
        <h1 className="text-3xl mt-10 text-white tracking-widest">Personagens Ativos:</h1>
        <div className="grid grid-cols-4 h-full ml-10 auto-rows-[150px] gap-14">
          {characters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
          <Link
            to={`/create-character/${campaign.id}`}
            className="bg-dark-bg-secondary items-center w-[95%] hover:scale-105 duration-300 flex rounded-2xl border border-primary text-foreground font-oswald px-5 py-5"
          >
            <h1 className="text-3xl text-center flex items-center gap-x-2 justify-center w-full">
              <IoIosAddCircleOutline className="text-primary text-4xl" /> Criar Personagem
            </h1>
          </Link>
        </div>
      </div>
    </PageSetup>
  );
}
