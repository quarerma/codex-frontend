import { useQuery } from '@tanstack/react-query';
import { CreateComponentProps } from '../props/create-component';
import { getClassFeats, getFilteredSubClassFeats, getFilteresClassFeats, getNonCustomFeats, getSubClassFeats } from '../../../api/fetch/feats';
import FeatPicker from './feats-picker';
import { useEffect, useState } from 'react';
import { useCharacterCreation } from '../create-character';
import { Feat } from '../../../types/feat';

import { FaSearch, FaTrash } from 'react-icons/fa';

import { getSubclasses } from '../../../api/fetch/subclass';
import DeafultFeats from './feats-selected';
import { FeatFilter } from '../../../components/global/featfilter';
import { get } from '../../../api/axios';
import { ClassModel } from '../../../types/class';

export const getClassColor = (className: string) => {
  switch (className) {
    case 'Combatente':
      return 'bg-red-500';
    case 'Especialista':
      return 'bg-green-500';
    case 'Ocultista':
      return 'bg-blue-500';
    default:
      return 'bg-gray-500'; // Valor padrão caso a classe não corresponda a nenhum caso
  }
};

export default function FeatsRegister({ setValue, watch }: CreateComponentProps) {
  const { data: non_custom_feats = [] } = useQuery({
    queryKey: ['feats'],
    queryFn: getNonCustomFeats,
  });

  const { data: classes = [] } = useQuery({
    queryKey: ['classes'],
    queryFn: async () => (await get('classes')) as ClassModel[],
  });

  const { data: subclasses = [] } = useQuery({
    queryKey: ['subclasses'],
    queryFn: getSubclasses,
  });

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredFeats, setFilteredFeats] = useState<Feat[]>(non_custom_feats);
  const [selectedElement, setSelectedElement] = useState<string>('all');
  const [selectedFilter, setSelectedFilter] = useState<'class' | 'all' | 'element' | 'subclass' | 'campaign'>('all');
  const [selectedClassFilter, setSelectedClass] = useState<string>('all');
  const [selectedSubclassFilter, setSelectedSubclass] = useState<string>('all');

  const { selectedFeats, setSelectedFeats, selectedOrigin, selectedSubclass } = useCharacterCreation();

  // Queries para otimizar cada filtro no switch
  const { data: classFeats, isLoading: isClassFeatsLoading } = useQuery({
    queryKey: ['classFeats', selectedClassFilter],
    queryFn: () => (selectedClassFilter === 'all' ? getClassFeats() : getFilteresClassFeats(selectedClassFilter)),
    enabled: selectedFilter === 'class', // Só roda a query se o filtro for 'class'
  });

  const { data: subclassFeats, isLoading: isSubclassFeatsLoading } = useQuery({
    queryKey: ['subclassFeats', selectedSubclassFilter],
    queryFn: () => (selectedSubclassFilter === 'all' ? getSubClassFeats() : getFilteredSubClassFeats(selectedSubclassFilter)),
    enabled: selectedFilter === 'subclass', // Só roda a query se o filtro for 'subclass'
  });

  useEffect(() => {
    let filtered = non_custom_feats;

    if (searchTerm) {
      filtered = filtered.filter((feat) => feat.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    switch (selectedFilter) {
      case 'element':
        if (selectedElement !== 'all' && selectedElement) {
          filtered = filtered.filter((feat) => feat.element === selectedElement);
        } else if (selectedElement === 'all') {
          filtered = filtered.filter((feat) => feat.element !== 'REALITY');
        }
        break;
      case 'class':
        if (!isClassFeatsLoading && classFeats) {
          filtered = classFeats;
        }
        break;
      case 'subclass':
        if (!isSubclassFeatsLoading && subclassFeats) {
          filtered = subclassFeats;
        }
        break;
      default:
        break;
    }

    // remove the feats that are already selected
    const currentFeatsId = watch('featsId') || [];

    filtered = filtered.filter((feat) => !currentFeatsId.includes(feat.id));

    if (selectedSubclass) {
      const subclassFeats = selectedSubclass.subclassFeats;
      const characterLevel = watch('level');

      const filteredSubclassFeats = subclassFeats.filter((feat) => feat.levelRequired <= (characterLevel == 99 ? 20 : characterLevel / 5));

      const subclassFeatsId = filteredSubclassFeats.map((feat) => feat.feat.id);

      filtered = filtered.filter((feat) => !subclassFeatsId.includes(feat.id));
    }
    if (selectedOrigin) {
      const originFeatsId = selectedOrigin.feats.id;
      filtered = filtered.filter((feat) => !originFeatsId.includes(feat.id));
    }

    setFilteredFeats(filtered);
  }, [
    searchTerm,
    non_custom_feats,
    selectedElement,
    selectedFilter,
    classFeats,
    subclassFeats,
    isClassFeatsLoading,
    isSubclassFeatsLoading,
    selectedSubclass,
    selectedOrigin,
    watch('level'),
    watch('featsId'),
  ]);

  const unSelectFeat = (feat: Feat) => {
    const currentFeatsId = watch('featsId') || [];
    // remove the feat id from the character feats array
    setValue(
      'featsId',
      currentFeatsId.filter((id: string) => id !== feat.id)
    );

    const pastFeats: Feat[] = selectedFeats || [];
    // check if the feat is in the array and remove it
    const updatedFeats = pastFeats.filter((f) => f.id !== feat.id);
    setSelectedFeats(updatedFeats);
  };

  return (
    <div className="flex flex-col md:flex-row  max-h-[90vh] justify-center overflow-hidden">
      <div
        className="w-full md:w-[40%] text-2xl font-light max-h-screen px-5 md:px-20 flex flex-col space-y-5 overflow-auto"
        style={{
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}
      >
        <div>
          <h1 className="text-3xl">Poderes Selecionados:</h1>
          <ul className="mt-2 ml-5 flex flex-col space-y-5">
            {selectedFeats ? (
              selectedFeats.map((feat, index) => (
                <div className="border-2 border-muted p-3 flex justify-between items-center" key={index}>
                  <span>{feat.name}</span>
                  <FaTrash className="text-red-500 cursor-pointer hover:scale-125 duration-300" onClick={() => unSelectFeat(feat)} />
                </div>
              ))
            ) : (
              <span className="mt-2 italic">Nenhum poder selecionado</span>
            )}
          </ul>
        </div>
        <div>
          <h1 className="text-3xl">Poderes Padrão:</h1>
          <div className="mt-2 ml-5 flex flex-col space-y-5">
            <DeafultFeats watch={watch} />
          </div>
        </div>
      </div>
      <div className="hidden md:block w-[2px] h-[70vh] bg-muted"></div>
      <div
        className="w-full md:w-[60%] flex flex-col space-y-5 overflow-auto"
        style={{
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}
      >
        <div className="flex flex-col space-x-4 px-5 md:px-20">
          <div className="flex w-full">
            <div className="flex-col w-full border-b-2 border-border">
              <input
                type="text"
                placeholder="Buscar por nome..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="placeholder:text-foreground placeholder:text-4xl font-extralight text-3xl bg-transparent w-full focus:outline-none"
              />
              <div className="w-full h-[1px] drop-shadow-xl bg-white-text"></div>
            </div>
            <FaSearch className="text-2xl" />
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
            showCampaign={false}
          />
        </div>

        <div
          className="max-h-[80vh] px-5 md:px-20 flex flex-col space-y-5 overflow-auto"
          style={{
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }}
        >
          {filteredFeats.map((feat, index) => (
            <FeatPicker key={index} feat={feat} setValue={setValue} watch={watch} />
          ))}
        </div>
      </div>
    </div>
  );
}
