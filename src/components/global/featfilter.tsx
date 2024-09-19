import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select';
import { getClassColor } from '../../pages/create-character/components/feats-register';
import { elementValues } from '../../types/elements';

interface FeatFilterProps {
  selectedFilter: string;
  setSelectedFilter: (value: 'class' | 'all' | 'element' | 'subclass' | 'campaign') => void;
  selectedElement: string;
  setSelectedElement: (value: string) => void;
  selectedClass: string;
  setSelectedClass: (value: string) => void;
  selectedSubclass: string;
  setSelectedSubclass: (value: string) => void;
  classes: any[];
  subclasses: any[];
  showCampaign?: boolean;
}

export const FeatFilter = ({
  selectedFilter,
  setSelectedFilter,
  selectedElement,
  setSelectedElement,
  selectedClass,
  setSelectedClass,
  selectedSubclass,
  setSelectedSubclass,
  classes,
  subclasses,
  showCampaign,
}: FeatFilterProps) => {
  return (
    <div className="flex flex-col justify-start mt-2 space-x-5">
      <div className="flex text-xl space-x-5 items-center">
        <span>Filtrar por:</span>
        <span
          onClick={() => setSelectedFilter('all')}
          className={`cursor-pointer ${selectedFilter === 'all' && 'underline'} hover:scale-105 duration-200`}
        >
          Todos
        </span>
        <span
          onClick={() => setSelectedFilter('class')}
          className={`cursor-pointer ${selectedFilter === 'class' && 'underline'} hover:scale-105 duration-200`}
        >
          Classe
        </span>
        <span
          onClick={() => setSelectedFilter('subclass')}
          className={`cursor-pointer ${selectedFilter === 'subclass' && 'underline'} hover:scale-105 duration-200`}
        >
          Subclasse
        </span>
        {showCampaign && (
          <span
            onClick={() => setSelectedFilter('campaign')}
            className={`cursor-pointer ${selectedFilter === 'campaign' && 'underline'} hover:scale-105 duration-200`}
          >
            Campanha
          </span>
        )}

        <span
          onClick={() => setSelectedFilter('element')}
          className={`cursor-pointer ${selectedFilter === 'element' && 'underline'} hover:scale-105 duration-200`}
        >
          Elemento
        </span>
      </div>
      <div className="mt-3 space-x-5 flex items-center text-lg list-outside list-disc">
        {selectedFilter === 'element' && (
          <Select onValueChange={setSelectedElement} value={selectedElement}>
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
        )}
        {selectedFilter === 'class' && (
          <Select onValueChange={setSelectedClass} value={selectedClass}>
            <SelectTrigger className="w-[300px]">
              <SelectValue placeholder="Selecione uma classe" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Classes</SelectLabel>
                <SelectItem value="all">Todas Classes</SelectItem>
                {classes.map((classe) => (
                  <SelectItem key={classe.id} value={classe.id}>
                    <div className="flex space-x-2 items-center">
                      <div className={`w-2 h-2 rounded-full ${getClassColor(classe.name)}`}></div>
                      <div>{classe.name}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
        {selectedFilter === 'subclass' && (
          <Select onValueChange={setSelectedSubclass} value={selectedSubclass}>
            <SelectTrigger className="w-[300px]">
              <SelectValue placeholder="Selecione uma subclasse" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Subclasses</SelectLabel>
                <SelectItem value="all">Todas Subclasses</SelectItem>
                {subclasses.map((subclass) => (
                  <SelectItem key={subclass.id} value={subclass.id}>
                    <div className="flex space-x-2 items-center">
                      <div className={`w-2 h-2 rounded-full ${getClassColor(subclass.class.name)}`}></div>
                      <div>{subclass.name}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      </div>
    </div>
  );
};
