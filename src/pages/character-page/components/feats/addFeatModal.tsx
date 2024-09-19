import { useQuery } from '@tanstack/react-query';
import { DialogContent, DialogHeader, DialogTitle } from '../../../../components/ui/dialog';
import {
  getCampaignPossibleFeats,
  getClassFeats,
  getFilteredSubClassFeats,
  getFilteresClassFeats,
  getSubClassFeats,
} from '../../../../api/fetch/feats';
import { Feat } from '../../../../types/feat';
import { useEffect, useState } from 'react';
import AddFeatInfo from './addfeat-info';
import { getClasses } from '../../../../api/fetch/classes';
import { getSubclasses } from '../../../../api/fetch/subclass';
import { FaSearch } from 'react-icons/fa';
import { FeatFilter } from '../../../../components/global/featfilter';
import { useCharacterFeats } from './character-feat';
import { useCharacter } from '../../character-page';

export const AddFeatModal = () => {
  const { character } = useCharacter();
  const { data: all_feats = [] } = useQuery({
    queryKey: ['feats'],
    queryFn: () => getCampaignPossibleFeats(character.campaignId),
  });

  const { data: classes = [] } = useQuery({
    queryKey: ['classes'],
    queryFn: getClasses,
  });

  const { data: subclasses = [] } = useQuery({
    queryKey: ['subclasses'],
    queryFn: getSubclasses,
  });

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredFeats, setFilteredFeats] = useState<Feat[]>(all_feats);
  const [selectedElement, setSelectedElement] = useState<string>('all');
  const [selectedFilter, setSelectedFilter] = useState<'class' | 'all' | 'element' | 'subclass' | 'campaign'>('all');
  const [selectedClassFilter, setSelectedClass] = useState<string>('all');
  const [selectedSubclassFilter, setSelectedSubclass] = useState<string>('all');

  const { characterFeats } = useCharacterFeats();

  // Queries para otimizar cada filtro no switch
  const { data: classFeats, isLoading: isClassFeatsLoading } = useQuery({
    queryKey: ['classFeats', selectedClassFilter],
    queryFn: () => (selectedClassFilter === 'all' ? getClassFeats() : getFilteresClassFeats(selectedClassFilter)),
    enabled: selectedFilter === 'class', // Só roda a query se o filtro for 'class'
  });

  const { data: subclassFeats, isLoading: isSubclassFeatsLoading } = useQuery({
    queryKey: ['subclassFeats', selectedSubclassFilter],
    queryFn: () =>
      selectedSubclassFilter === 'all' ? getSubClassFeats() : getFilteredSubClassFeats(selectedSubclassFilter),
    enabled: selectedFilter === 'subclass', // Só roda a query se o filtro for 'subclass'
  });

  useEffect(() => {
    let feats = all_feats;

    console.log('Adicionou feat');
    if (searchTerm) {
      feats = feats.filter((feat) => feat.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    switch (selectedFilter) {
      case 'class':
        if (!isClassFeatsLoading && classFeats) {
          feats = classFeats;
        }
        break;
      case 'subclass':
        if (!isSubclassFeatsLoading && subclassFeats) {
          feats = subclassFeats;
        }
        break;
      case 'campaign':
        feats = feats.filter((feat) => feat.type === 'CUSTOM');
        break;
      case 'element':
        if (selectedElement !== 'all' && selectedElement) {
          feats = feats.filter(
            (feat) => feat.element === selectedElement && feat.type !== 'CUSTOM' && feat.type === 'GENERAL'
          );
        } else if (selectedElement === 'all') {
          feats = feats.filter(
            (feat) => feat.element !== 'REALITY' && feat.type !== 'CUSTOM' && feat.type === 'GENERAL'
          );
        }
        break;
      default:
        break;
    }

    // Remove feats that the character already has
    feats = feats.filter((feat) => !characterFeats.some((charFeat) => charFeat.feat.id === feat.id));
    setFilteredFeats(feats);
  }, [
    all_feats,
    searchTerm,
    selectedFilter,
    selectedElement,
    characterFeats, // Agora observando o `characterFeats` ao invés de `character.feats`
    classFeats,
    isClassFeatsLoading,
    subclassFeats,
    isSubclassFeatsLoading,
  ]);
  return (
    <DialogContent
      className="text-foreground  max-h-[80vh] w-1/3 h-[80vh] font-oswald overflow-y-auto flex flex-col space-y-5   border-primary"
      style={{
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
      }}
    >
      <DialogHeader>
        <DialogTitle className="p-2  text-3xl">Adicionar Poder</DialogTitle>
      </DialogHeader>
      <div id="filter">
        <div className="flex w-full">
          <div className="flex-col w-full border-b-2 border-border">
            <input
              type="text"
              placeholder="Buscar por nome..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="placeholder:text-foreground placeholder:text-xl font-extralight text-lg bg-transparent w-full focus:outline-none"
            />
            <div className="w-full h-[1px] drop-shadow-xl bg-white-text"></div>
          </div>
          <FaSearch className="text-lg" />
        </div>
        <FeatFilter
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          selectedElement={selectedElement}
          setSelectedElement={setSelectedElement}
          selectedClass={selectedClassFilter}
          setSelectedClass={setSelectedClass}
          selectedSubclass={selectedSubclassFilter}
          setSelectedSubclass={setSelectedSubclass}
          classes={classes}
          subclasses={subclasses}
          showCampaign={true}
        />
      </div>
      <div className=" flex flex-col space-y-2">
        {filteredFeats.length > 0 ? (
          filteredFeats.map((feat) => <AddFeatInfo key={feat.id} feat={feat} />)
        ) : (
          <span className=" text-3xl text-center mt-5 mb-5 italic">Nenhum poder encontrado</span>
        )}
      </div>
    </DialogContent>
  );
};
