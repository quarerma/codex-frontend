import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { getUserById } from '../../../api/fetch/user';
import { fetchCampaign } from '../../../api/fetch/campaigns';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NavBar from '../../../components/global/navbar';
import CampaignSideBar from './campaign-side-bar';
import { BsCopy } from 'react-icons/bs';

export default function DmPageSetup({ children }: { children: React.ReactNode }) {
  const { id: campaignId } = useParams();
  const { data: campaign } = useQuery({
    queryKey: ['campaign', campaignId],
    queryFn: () => fetchCampaign(campaignId),
    enabled: !!campaignId,
  });

  const copyToClipboard = () => {
    navigator.clipboard.writeText(campaignId || '');
  };

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: getUserById,
  });

  const [isUserValid, setIsUserValid] = useState(false);

  useEffect(() => {
    if (user && campaign) {
      if (user.id === campaign.owner.id) {
        setIsUserValid(true);
      } else {
        const isUserInCampaign = campaign.players.some((player) => player.playerId === user.id);
        if (isUserInCampaign) {
          setIsUserValid(true);
        }
      }
    }
  }, [user, campaign]);

  // Verificação de carregamento e permissões
  if (!campaign || !user) {
    return (
      <div className="w-screen min-h-screen  bg-dark-bg space-y-5">
        <NavBar />
        <div className="flex justify-center items-center h-[70vh] space-x-5">
          <h1 className="text-white/30 font-semibold tracking-widest text-5xl">Loading</h1>
          <div className="w-10 h-10 border-b-2 border-l-2 border-primary rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!isUserValid) {
    return (
      <div className="w-screen min-h-screen  bg-dark-bg space-y-5">
        <NavBar />
        <div className="flex justify-center items-center h-[70vh] space-x-5">
          <h1 className="text-white/30 font-semibold tracking-widest text-5xl">Você não tem permissão para acessar essa página</h1>
        </div>
      </div>
    );
  }

  const formattedCreatedAt = format(new Date(campaign.createdAt), 'dd/MM/yyyy');

  return (
    <div className="w-screen min-h-screen  bg-dark-bg ">
      <NavBar />
      <div
        className="flex  text-foreground max-h-[92vh] h-[92vh]  overflow-y-auto "
        style={{
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}
      >
        <CampaignSideBar />
        <div
          className="flex flex-col text-foreground mt-5 w-full 2xl:max-h-[92vh] xl:max-h-[87vh] overflow-y-auto  ml-2 mr-2"
          style={{
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }}
        >
          <div className="items-center flex w-full px-10  justify-between 2xl:text-4xl xl:text-3xl text-xl h-[5vh] ">
            <h1 className="text-white/30 font-semibold tracking-widest 2xl:text-5xl xl:text-5xl text-2xl">Campaign Page</h1>
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
              <span className="text-primary font-light">Criada em:</span>
              {formattedCreatedAt}
            </h1>
            <h1 onClick={copyToClipboard} className="flex cursor-pointer  items-center gap-x-2 font-extralight">
              <span className="text-white font-light">Copiar Id</span>
              <BsCopy />
            </h1>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
