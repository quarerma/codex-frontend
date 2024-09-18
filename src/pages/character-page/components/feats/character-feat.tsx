import { createContext, useContext, useEffect, useState } from 'react';

import FeatInfo from './feat-info';
import { Dialog, DialogTrigger } from '../../../../components/ui/dialog';
import { AddFeatModal } from './addFeatModal';
import { useCharacter } from '../../character-page';
import { Feat } from '../../../../types/feat';

const CharacterFeatsContext = createContext<{
  characterFeats: { feat: Feat; usingAfinity: boolean }[];
  setCharacterFeats: React.Dispatch<React.SetStateAction<{ feat: Feat; usingAfinity: boolean }[]>>;
} | null>(null);

export const useCharacterFeats = () => {
  const context = useContext(CharacterFeatsContext);
  if (!context) {
    throw new Error('useCharacterFeats must be used within a CharacterFeatsProvider');
  }
  return context;
};
export default function CharacterFeats() {
  const { character } = useCharacter();

  const [characterFeats, setCharacterFeats] = useState(character.feats);
  const [filteredFeats, setFilteredFeats] = useState(character.feats);

  const [filter, setFilter] = useState<'all' | 'class' | 'subclass' | 'origin' | 'paranormal' | 'campaign'>('all');

  useEffect(() => {
    let feats = characterFeats;

    if (filter === 'class') {
      feats = feats.filter((feat) => feat.feat.type === 'CLASS');
    } else if (filter === 'subclass') {
      feats = feats.filter((feat) => feat.feat.type === 'SUBCLASS');
    } else if (filter === 'origin') {
      feats = feats.filter((feat) => feat.feat.type === 'ORIGIN');
    } else if (filter === 'paranormal') {
      feats = feats.filter((feat) => feat.feat.type === 'GENERAL' && feat.feat.element !== 'REALITY');
    } else if (filter === 'campaign') {
      feats = feats.filter((feat) => feat.feat.type === 'CUSTOM');
    }

    // ordenar feats por nome
    feats.sort((a, b) => a.feat.name.localeCompare(b.feat.name));
    setFilteredFeats(feats);
  }, [character.feats, filter, characterFeats]);
  return (
    <CharacterFeatsContext.Provider value={{ characterFeats, setCharacterFeats }}>
      <div
        className="overflow-y-auto   max-h-[75vh] "
        style={{
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}
      >
        <div className="flex justify-between space-x-2 items-center font-oswald text-white/90 pl-2 mt-2 mb-2">
          <h1
            className={`cursor-pointer ${filter === 'all' && 'text-primary/70 underline'} `}
            onClick={() => setFilter('all')}
          >
            Todos
          </h1>
          <h1
            className={`cursor-pointer  ${filter === 'class' && 'text-primary/70 underline'}`}
            onClick={() => setFilter('class')}
          >
            Classe
          </h1>
          <h1
            className={`cursor-pointer  ${filter === 'subclass' && 'text-primary/70 underline'}`}
            onClick={() => setFilter('subclass')}
          >
            Subclasse
          </h1>
          <h1
            className={`cursor-pointer  ${filter === 'origin' && 'text-primary/70 underline'}`}
            onClick={() => setFilter('origin')}
          >
            Origem
          </h1>
          <h1
            className={`cursor-pointer  ${filter === 'campaign' && 'text-primary/70 underline'}`}
            onClick={() => setFilter('campaign')}
          >
            Campanha
          </h1>
          <h1
            className={`cursor-pointer  ${filter === 'paranormal' && 'text-primary/70 underline'}`}
            onClick={() => setFilter('paranormal')}
          >
            Paranormal
          </h1>
          <Dialog>
            <DialogTrigger className="bg-primary text-primary-foreground p-1">+ Adicionar</DialogTrigger>
            <AddFeatModal />
          </Dialog>
        </div>
        <div className="flex flex-col space-y-1">
          {filteredFeats.map((feat) => (
            <div key={feat.feat.id}>
              <FeatInfo feat={feat.feat} usingAfinity={feat.usingAfinity} />
            </div>
          ))}
        </div>
      </div>
    </CharacterFeatsContext.Provider>
  );
}
