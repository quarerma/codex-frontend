import { createContext, useContext, useEffect, useState } from 'react';

import RitualInfo from './rituals-info';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../../../../components/ui/select';
import { elementValues } from '../../../../types/elements';
import { useCharacter } from '../../character-page';
import { Dialog, DialogTrigger } from '../../../../components/ui/dialog';
import { Ritual } from '../../../../types/ritual';
import AddRitualsModal from './add-rituals-modal';

const CharacterRitualsContext = createContext<{
  characterRituals: { ritual: Ritual; ritual_cost: number }[];
  setCharacterRituals: React.Dispatch<React.SetStateAction<{ ritual: Ritual; ritual_cost: number }[]>>;
} | null>(null);

export const useCharacterRituals = () => {
  const context = useContext(CharacterRitualsContext);
  if (!context) {
    throw new Error('useCharacterRituals must be used within a CharacterRitualsProvider');
  }
  return context;
};

export default function CharacterRituals() {
  const { character } = useCharacter();
  const [filteredRituals, setFilteredRituals] = useState([]);
  const [selectedElementToFilter, setSelectedElementToFilter] = useState<string>('all');
  const [selectedLevelToFilter, setSelectedLevelToFilter] = useState<string>('0');
  const [characterRituals, setCharacterRituals] = useState(character.rituals);

  useEffect(() => {
    let filtered = characterRituals;

    const levelTonumber = Number(selectedLevelToFilter);

    if (selectedElementToFilter !== 'all') {
      filtered = filtered.filter((ritual) => ritual.ritual.element === selectedElementToFilter);
    }

    if (selectedLevelToFilter !== '0') {
      filtered = filtered.filter((ritual) => ritual.ritual.ritualLevel === levelTonumber);
    }

    // sort by name
    filtered.sort((a, b) => a.ritual.name.localeCompare(b.ritual.name));
    setFilteredRituals(filtered);
  }, [character.rituals, selectedElementToFilter, selectedLevelToFilter, characterRituals]);
  return (
    <CharacterRitualsContext.Provider value={{ characterRituals, setCharacterRituals }}>
      <div>
        <div className="flex justify-between items-center text-white/90 pl-2 mt-2 mb-2">
          <div className="flex  space-x-5">
            <Select onValueChange={setSelectedElementToFilter} value={selectedElementToFilter}>
              <SelectTrigger className="w-fit">
                <SelectValue placeholder="Selecione um elemento" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Elementos</SelectLabel>
                  <SelectItem value="all">Todos Elementos</SelectItem>
                  {elementValues.map((element) => (
                    <SelectItem key={element.value} value={element.value}>
                      {element.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select defaultValue="0" onValueChange={setSelectedLevelToFilter} value={selectedLevelToFilter}>
              <SelectTrigger className="w-fit">
                <SelectValue placeholder="Selecione o círculo do ritual" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Círculos</SelectLabel>
                  <SelectItem value="0">Todos Círculos</SelectItem>
                  <SelectItem value="1">1° Círculo</SelectItem>
                  <SelectItem value="2">2° Círculo</SelectItem>
                  <SelectItem value="3">3° Círculo</SelectItem>
                  <SelectItem value="4">4° Círculo</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Dialog>
            <DialogTrigger className="bg-primary text-primary-foreground p-1">+ Adicionar</DialogTrigger>
            <AddRitualsModal />
          </Dialog>
        </div>
        <div className="flex flex-col space-y-1 max-h-[65vh] overflow-y-scroll " style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
          {filteredRituals.map((ritual) => (
            <div key={ritual.ritual.id}>
              <RitualInfo ritual={ritual.ritual} ritual_cost={ritual.ritual_cost} />
            </div>
          ))}
        </div>
      </div>
    </CharacterRitualsContext.Provider>
  );
}
