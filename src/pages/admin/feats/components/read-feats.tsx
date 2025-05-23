import { useEffect, useState } from 'react';
import { Input } from '../../../../components/ui/input';
import { Feat } from '../../../../types/feat';
import { getGeneralFeats } from '../../../../api/fetch/feats';
import { useQuery } from '@tanstack/react-query';
import { getElementColor } from './create-feats';
import { elementValues } from '../../../../types/elements';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../../../../components/ui/select';

export default function ReadFeats() {
  const elements = elementValues;

  function formatElement(value: string) {
    const index = elements.findIndex((element) => element.value === value);

    return elements[index].label;
  }
  const { data: feats = [] } = useQuery({
    queryKey: ['feats'],
    queryFn: getGeneralFeats,
  });

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredFeats, setFilteredFeats] = useState<Feat[]>(feats);
  const [selectedElement, setSelectedElement] = useState<string>('');

  useEffect(() => {
    let filtered = feats;

    if (searchTerm) {
      filtered = filtered.filter((feat) => feat.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (selectedElement !== 'all' && selectedElement) {
      filtered = filtered.filter((feat) => feat.element === selectedElement);
    }

    setFilteredFeats(filtered);
  }, [searchTerm, feats, selectedElement]);

  return (
    <div className="bg-dark-bg-secondary flex flex-col space-y-10 p-5 w-full rounded-2xl h-fit border-2 border-border">
      <h1 className="text-5xl font-bold">Exibindo Poderes</h1>
      <div className="flex flex-col space-y-5">
        <h2 className="text-4xl">Filtro:</h2>

        <div className="flex flex-col space-y-2">
          <Select onValueChange={setSelectedElement} value={selectedElement}>
            <SelectTrigger className="w-[300px]">
              <SelectValue placeholder="Selecione um Elemento" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Elementos</SelectLabel>
                <SelectItem value="all">Todos</SelectItem>
                {elements.map((elements) => (
                  <SelectItem key={elements.label} value={elements.value}>
                    {elements.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {selectedElement && selectedElement != 'all' && <label className="text-xl ml-2 text-primary-foreground font-bold">Poderes de {formatElement(selectedElement)}</label>}
        </div>
        <Input type="text" placeholder="Buscar por nome da perícia" className="p-2 border-2 bg-card border-border rounded  w-full" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>
      {filteredFeats.map((feat, index) => {
        const elementColor = getElementColor(feat.element || ''); // Obtém a cor do elemento para o feat

        return (
          <div key={index} className="space-y-5 p-5 border-2 border-border">
            <div className="gap-y-2">
              <h2 className={`text-5xl font-bold ${elementColor.text}`}>{feat.name}</h2>
              <h3 className="font-extralight text-2xl">Elemento: {formatElement(feat.element || '')}</h3>
            </div>
            <div>
              <h3 className="font-bold text-3xl">Descrição:</h3>
              <p className="text-xl" dangerouslySetInnerHTML={{ __html: feat.description }}></p>
            </div>
            {feat.afinity && (
              <div>
                <h3 className="font-bold text-3xl">Afinidade:</h3>
                <p className="text-xl">{feat.afinity}</p>
              </div>
            )}
            {feat.prerequisites && (
              <div>
                <h3 className="font-bold text-3xl">Pré-requisitos:</h3>
                <p className="text-xl">{feat.prerequisites}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
