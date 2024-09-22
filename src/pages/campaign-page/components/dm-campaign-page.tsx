import { useParams } from 'react-router-dom';
import CharacterCard from './char-card';
import DmPageSetup from './dm-page-setup';
import { useQuery } from '@tanstack/react-query';
import { getCampaignCharacters } from '../../../api/fetch/campaigns';

export default function CampaignPage() {
  const { id: campaignId } = useParams();
  const { data: characters } = useQuery({
    queryKey: ['campaign-characters', campaignId],
    queryFn: () => getCampaignCharacters(campaignId),
    enabled: !!campaignId,
  });

  return (
    characters && (
      <DmPageSetup>
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
          </div>
        </div>
      </DmPageSetup>
    )
  );
}
