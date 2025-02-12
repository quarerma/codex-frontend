import { useParams } from 'react-router-dom';
import DmPageSetup from './dm-page-setup';
import { getCampaignCharacters, getCampaignPlayers } from '../../../api/fetch/campaigns';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';

export default function ManageCampaignPlayers() {
  const campaignId = useParams().id;

  const { data: players, isLoading } = useQuery({
    queryKey: ['players', campaignId],
    queryFn: () => getCampaignPlayers(campaignId || ''),
  });

  const { data: characters } = useQuery({
    queryKey: ['campaign-characters', campaignId],
    queryFn: () => getCampaignCharacters(campaignId),
    enabled: !!campaignId,
  });

  if (isLoading) {
    return (
      <DmPageSetup>
        <div className="flex">
          <h1 className="text-white/30 font-semibold tracking-widest text-5xl">Loading</h1>
          <div className="w-10 h-10 border-b-2 border-l-2 border-primary rounded-full animate-spin"></div>
        </div>
      </DmPageSetup>
    );
  }

  function findUserCharacters(userId: string) {
    console.log(characters, userId);
    return characters?.filter((character) => character.owner.id === userId).map((character) => character.name) as string[];
  }
  return (
    <DmPageSetup>
      <div className="w-full flex flex-col p-20 ">
        <div className="ml-6 sticky -mb-1 ">
          <h1 className="text-4xl font-bold">Jogadores:</h1>
        </div>
        <div className="flex flex-col border-2 border-border gap-4 mt-4">
          {players?.map((player) => (
            <div key={player.player.id} className="flex flex-col gap-2 bg-dark-bg-secondary p-4 rounded-lg">
              <div className="flex items-center justify-between px-5 gap-2">
                <h2 className="text-3xl font-bold">Jogador: {player.player.username}</h2>
                <h1 className="text-3xl font-light">Entrou em: {format(new Date(player.joinedAt), 'dd/MM/yyyy - HH:mm')}</h1>
                <h1>
                  Personagens:
                  {characters &&
                    player &&
                    findUserCharacters(player.player.id).map((character, index) => (
                      <span key={index} className="text-primary">
                        {character}
                      </span>
                    ))}
                </h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DmPageSetup>
  );
}
