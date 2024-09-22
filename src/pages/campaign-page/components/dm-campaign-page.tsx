import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import NavBar from '../../../components/global/navbar';
import { format } from 'date-fns';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { useEffect, useState } from 'react';
import { getUserById } from '../../../api/fetch/user';
import { fetchCampaign, getCampaignCharacters } from '../../../api/fetch/campaigns';
import CharacterCard from './char-card';
import CampaignSideBar from './campaign-side-bar';

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
          <h1 className="text-white/30 font-semibold tracking-widest text-3xl">
            Você não tem permissão para acessar essa página
          </h1>
        </div>
      </div>
    );
  }

  const formattedCreatedAt = format(new Date(campaign.createdAt), 'dd/MM/yyyy');

  return (
    <div className="w-screen min-h-screen font-oswald bg-dark-bg ">
      <NavBar />
      <div
        className="flex  text-foreground max-h-[92vh]  overflow-y-auto "
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
          <div className="items-center flex w-full px-10  justify-between 2xl:text-2xl xl:text-xl text-base h-[5vh] ">
            <h1 className="text-white/30 font-semibold tracking-widest 2xl:text-4xl xl:text-3xl text-lg">
              Campaign Page
            </h1>
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
            className="mt-5 flex items-end  flex-col h-[80vh]  space-y-10   "
            style={{
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
            }}
          >
            <div
              className="flex flex-col w-[300px] items-center  h-full space-y-2 max-h-[80vh] overflow-y-auto"
              style={{
                msOverflowStyle: 'none',
                scrollbarWidth: 'none',
              }}
            >
              <h1 className="text-3xl   text-center text-white tracking-widest">Personagens </h1>
              {characters.map((character) => (
                <CharacterCard key={character.id} character={character} />
              ))}
              {characters.map((character) => (
                <CharacterCard key={character.id} character={character} />
              ))}
              {characters.map((character) => (
                <CharacterCard key={character.id} character={character} />
              ))}
              {characters.map((character) => (
                <CharacterCard key={character.id} character={character} />
              ))}
              {characters.map((character) => (
                <CharacterCard key={character.id} character={character} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
