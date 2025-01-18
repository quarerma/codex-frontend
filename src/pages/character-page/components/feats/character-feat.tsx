import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import FeatInfo from './feat-info';
import { Dialog, DialogTrigger } from '../../../../components/ui/dialog';
import { AddFeatModal } from './addFeatModal';
import { useCharacter } from '../../character-page';
import { Feat } from '../../../../types/feat';
import { get } from '../../../../api/axios';
import { useQuery } from '@tanstack/react-query';

// Context for Character Feats
const CharacterFeatsContext = createContext<{
  characterFeats: { feat: Feat; usingAfinity: boolean; requiredLevel?: number }[] | undefined;
}>({ characterFeats: undefined });

export const useCharacterFeats = () => {
  const context = useContext(CharacterFeatsContext);
  if (!context) {
    throw new Error('useCharacterFeats must be used within a CharacterFeatsProvider');
  }
  return context;
};

export default function CharacterFeats() {
  const { character } = useCharacter();
  const [filter, setFilter] = useState<'all' | 'class' | 'subclass' | 'origin' | 'paranormal' | 'campaign'>('all');

  // Fetching character feats
  const { data: characterFeats = [] } = useQuery({
    queryKey: ['character-feats', character.id],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append('id', character.id);
      params.append('level', character.level.toString());
      return (await get('feats/character-possible-feats', { params })) as { feat: Feat; usingAfinity: boolean; requiredLevel?: number }[];
    },
  });

  // Filtering and sorting feats based on filter
  const filteredFeats = useMemo(() => {
    console.log(characterFeats);
    let feats = characterFeats;

    switch (filter) {
      case 'class':
        feats = feats.filter((feat) => feat.feat.type === 'CLASS');
        break;
      case 'subclass':
        feats = feats.filter((feat) => feat.feat.type === 'SUBCLASS');
        break;
      case 'origin':
        feats = feats.filter((feat) => feat.feat.type === 'ORIGIN');
        break;
      case 'paranormal':
        feats = feats.filter((feat) => feat.feat.element !== 'REALITY');
        break;
      case 'campaign':
        feats = feats.filter((feat) => feat.feat.type === 'CUSTOM');
        break;
    }

    // Sort feats alphabetically by name
    return feats.sort((a, b) => a.feat.name.localeCompare(b.feat.name));
  }, [filter, characterFeats]);

  return (
    <CharacterFeatsContext.Provider value={{ characterFeats }}>
      <div>
        {/* Filters */}
        <div className="flex justify-between space-x-2 items-center font-oswald text-white/90 pl-2 mt-2 mb-2">
          {['all', 'class', 'subclass', 'origin', 'campaign', 'paranormal'].map((type) => (
            <h1 key={type} className={`cursor-pointer text-lg ${filter === type && 'text-primary/70 underline'}`} onClick={() => setFilter(type as typeof filter)}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </h1>
          ))}
        </div>

        {/* Add Feat Button */}
        <div className="mb-2 flex justify-end">
          <Dialog>
            <DialogTrigger className="bg-primary text-primary-foreground p-1">+ Adicionar</DialogTrigger>
            <AddFeatModal />
          </Dialog>
        </div>

        {/* Feat List */}
        <div
          className="flex flex-col space-y-1 max-h-[65vh] overflow-y-scroll"
          style={{
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }}
        >
          {filteredFeats.map((feat) => (
            <div key={feat.feat.id}>
              <FeatInfo feat={feat.feat} usingAfinity={feat.usingAfinity} requiredLevel={feat.requiredLevel} />
            </div>
          ))}
        </div>
      </div>
    </CharacterFeatsContext.Provider>
  );
}
