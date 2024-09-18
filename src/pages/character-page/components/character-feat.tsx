import { useEffect, useState } from 'react';
import { Character } from '../../../types/character';
import FeatInfo from './feat-info';

interface CharacterFeatProps {
  character: Character;
}

export default function CharacterFeats({ character }: CharacterFeatProps) {
  const [filteredFeats, setFilteredFeats] = useState(character.feats);

  const [filter, setFilter] = useState<'all' | 'class' | 'subclass' | 'origin' | 'paranormal'>('all');

  useEffect(() => {
    let feats = character.feats;

    if (filter === 'class') {
      feats = feats.filter((feat) => feat.feat.type === 'CLASS');
    } else if (filter === 'subclass') {
      feats = feats.filter((feat) => feat.feat.type === 'SUBCLASS');
    } else if (filter === 'origin') {
      feats = feats.filter((feat) => feat.feat.type === 'ORIGIN');
    } else if (filter === 'paranormal') {
      feats = feats.filter((feat) => feat.feat.type === 'GENERAL' && feat.feat.element !== 'REALITY');
    }

    setFilteredFeats(feats);
  }, [character.feats, filter]);
  return (
    <div
      className="overflow-y-auto   max-h-[75vh] "
      style={{
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
      }}
    >
      <div className="flex justify-between items-center text-white/90 pl-2 mt-2 mb-2">
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
          className={`cursor-pointer  ${filter === 'paranormal' && 'text-primary/70 underline'}`}
          onClick={() => setFilter('paranormal')}
        >
          Paranormal
        </h1>
        <button className="bg-primary text-primary-foreground p-1">+ Adicionar</button>
      </div>
      <div className="flex flex-col space-y-1">
        {filteredFeats.map((feat) => (
          <div key={feat.feat.id}>
            <FeatInfo feat={feat.feat} usingAfinity={feat.usingAfinity} />
          </div>
        ))}
      </div>
    </div>
  );
}
