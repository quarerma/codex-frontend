import { useEffect, useState } from 'react';

import RitualInfo from './rituals-info';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import { elementValues } from '../../../types/elements';
import { useCharacter } from '../character-page';

export default function CharacterRituals() {
  const { character } = useCharacter();
  const [filteredRituals, setFilteredRituals] = useState(character.rituals);
  const [selectedElementToFilter, setSelectedElementToFilter] = useState<string>('all');
  const [selectedLevelToFilter, setSelectedLevelToFilter] = useState<string>('0');

  useEffect(() => {
    let filtered = character.rituals;

    const levelTonumber = Number(selectedLevelToFilter);

    if (selectedElementToFilter !== 'all') {
      filtered = filtered.filter((ritual) => ritual.ritual.element === selectedElementToFilter);
    }

    if (selectedLevelToFilter !== '0') {
      filtered = filtered.filter((ritual) => ritual.ritual.ritualLevel === levelTonumber);
    }
    setFilteredRituals(filtered);
  }, [character.rituals, selectedElementToFilter, selectedLevelToFilter]);
  return (
    <div
      className="overflow-y-auto   max-h-[75vh] "
      style={{
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
      }}
    >
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
        <button className="bg-primary text-primary-foreground p-1">+ Adicionar</button>
      </div>
      <div className="flex flex-col space-y-1">
        {filteredRituals.map((ritual) => (
          <div key={ritual.ritual.id}>
            <RitualInfo ritual={ritual.ritual} ritual_cost={ritual.ritual_cost} />
          </div>
        ))}
      </div>
    </div>
  );
}
