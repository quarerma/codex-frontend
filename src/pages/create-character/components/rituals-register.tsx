import { useQuery } from '@tanstack/react-query';
import { CreateComponentProps } from '../props/create-component';
import { getRituals } from '../../../api/fetch/rituals';
import RitualPicker from './rituals-picker';
import { useCharacterCreation } from '../create-character';
import { FaSearch, FaTrash } from 'react-icons/fa';
import { Ritual } from '../../../types/ritual';
import { useEffect, useState } from 'react';
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

export default function RitualsRegister({ setValue, watch }: CreateComponentProps) {
  const { data: rituals = [] } = useQuery({
    queryKey: ['rituals'],
    queryFn: getRituals,
  });

  const { selectedRituals, setSelectedRituals } = useCharacterCreation();

  const unSelectRituals = (ritual: Ritual) => {
    const currentRituals = watch('ritualsIds') || [];
    // remove the feat id from the character feats array
    setValue(
      'ritualsIds',
      currentRituals.filter((id: string) => id !== ritual.id)
    );

    const pastRituals: Ritual[] = selectedRituals || [];
    // check if the feat is in the array and remove it
    const updatedRituals = pastRituals.filter((f) => f.id !== ritual.id);
    setSelectedRituals(updatedRituals);
  };

  const [filteredRituals, setFilteredRituals] = useState<Ritual[]>(rituals);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedElementToFilter, setSelectedElementToFilter] = useState<string>('all');
  const [selectedLevelToFilter, setSelectedLevelToFilter] = useState<string>('0');

  useEffect(() => {
    let filtered = rituals;

    const levelTonumber = Number(selectedLevelToFilter);

    if (searchTerm) {
      filtered = filtered.filter((ritual) => ritual.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    if (selectedElementToFilter !== 'all') {
      filtered = filtered.filter((ritual) => ritual.element === selectedElementToFilter);
    }

    if (selectedLevelToFilter !== '0') {
      filtered = filtered.filter((ritual) => ritual.ritualLevel === levelTonumber);
    }

    // filter the selected rituals from the list
    const currentRituals = watch('ritualsIds') || [];

    filtered = filtered.filter((ritual) => !currentRituals.includes(ritual.id));

    setFilteredRituals(filtered);
  }, [searchTerm, rituals, selectedElementToFilter, selectedLevelToFilter, watch('ritualsIds')]);

  return (
    <div className="flex -mt-10 justify-center">
      <div
        style={{
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}
        className="w-[40%] text-2xl px-10 max-h-[60vh]  font-light"
      >
        <h1 className="text-3xl">Rituais Selecionados:</h1>
        <ul className="mt-2 ml-5 flex flex-col space-y-5">
          {selectedRituals && selectedRituals.length > 0 ? (
            selectedRituals.map((ritual, index) => (
              <div className="border-2 border-muted p-3 flex justify-between items-center" key={index}>
                <span>{ritual.name}</span>
                <FaTrash
                  className="text-red-500 cursor-pointer hover:scale-125 duration-300"
                  onClick={() => unSelectRituals(ritual)}
                />
              </div>
            ))
          ) : (
            <span className="mt-2 italic">Nenhum ritual selecionado</span>
          )}
        </ul>
      </div>
      <div className="w-[2px] h-[55vh] bg-muted"></div>

      <div
        className="flex flex-col w-[60%] space-y-5"
        style={{
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}
      >
        <div className="flex flex-col  space-x-4 px-20">
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
          <div className="flex mt-5 items-center  justify-center space-x-5">
            <Select onValueChange={setSelectedElementToFilter} value={selectedElementToFilter}>
              <SelectTrigger className="w-[300px]">
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
              <SelectTrigger className="w-[300px]">
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
        </div>

        <div
          className="max-h-[60vh] px-20 flex flex-col space-y-5 overflow-auto"
          style={{
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }}
        >
          {filteredRituals.map((ritual, index) => (
            <RitualPicker key={index} ritual={ritual} setValue={setValue} watch={watch} />
          ))}
        </div>
      </div>
    </div>
  );
}
