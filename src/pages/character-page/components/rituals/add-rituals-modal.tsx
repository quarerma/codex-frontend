import { useCharacterRituals } from './character-rituals';
import { DialogContent, DialogHeader, DialogTitle } from '../../../../components/ui/dialog';
import { useEffect, useState } from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../../../../components/ui/select';
import { elementValues } from '../../../../types/elements';
import AddRitualInfo from './add-ritual-info';
import { getCampaignPossibleRituals, getRituals } from '../../../../api/fetch/rituals';
import { useQuery } from '@tanstack/react-query';
import { useCharacter } from '../../character-page';

export default function AddRitualsModal() {
  const { characterRituals } = useCharacterRituals();

  const { character } = useCharacter();
  const { data: rituals = [] } = useQuery({
    queryKey: ['rituals', character.campaign.id],
    queryFn: () => getCampaignPossibleRituals(character.campaign.id),
  });

  const [filteredRituals, setFilteredRituals] = useState(rituals);
  const [selectedElementToFilter, setSelectedElementToFilter] = useState<string>('all');
  const [selectedLevelToFilter, setSelectedLevelToFilter] = useState<string>('0');

  useEffect(() => {
    let filtered = rituals;

    if (selectedElementToFilter !== 'all') {
      filtered = filtered.filter((ritual) => ritual.element === selectedElementToFilter);
    }

    if (selectedLevelToFilter !== '0') {
      filtered = filtered.filter((ritual) => ritual.ritualLevel === Number(selectedLevelToFilter));
    }

    // Remove the rituals that are already in the character's list
    filtered = filtered.filter((ritual) => !characterRituals.find((characterRitual) => characterRitual.ritual.id === ritual.id));

    // Only update the state if the filtered rituals have changed
    setFilteredRituals((prevFilteredRituals) => {
      if (JSON.stringify(prevFilteredRituals) !== JSON.stringify(filtered)) {
        return filtered;
      }
      return prevFilteredRituals;
    });
  }, [characterRituals, selectedElementToFilter, selectedLevelToFilter, rituals]);

  return (
    <DialogContent className="text-foreground 2xl:w-1/3 xl:w-1/2 max-h-[80vh] h-[80vh]   flex flex-col space-y-5   border-primary">
      <DialogHeader>
        <DialogTitle>Adicionar Ritual</DialogTitle>
      </DialogHeader>
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
      <div
        className="flex flex-col space-y-1 max-h-full overflow-auto"
        style={{
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}
      >
        {filteredRituals.map((ritual) => (
          <div key={ritual.id}>
            <AddRitualInfo ritual={ritual} />
          </div>
        ))}
      </div>
    </DialogContent>
  );
}
