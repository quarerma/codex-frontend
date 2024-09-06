import { useQuery } from '@tanstack/react-query';
import { getSkills } from '../../../../api/fetch/skills';
import { Atributes } from '../../../../types/character-upgrades';
import { useEffect, useState } from 'react';
import { Skills } from '../../../../types/skills';
import { Input } from '../../../../components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../../../../components/ui/select';

export default function ReadSkills() {
  const { data: skills = [] } = useQuery({
    queryKey: ['skills'],
    queryFn: getSkills,
  });

  const atributes = Atributes;

  const [selectedAtribute, setSelectedAtribute] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredSkills, setFilteredSkills] = useState<Skills[]>(skills);

  useEffect(() => {
    let filtered = skills;

    if (selectedAtribute) {
      if (selectedAtribute === 'all') {
        setSelectedAtribute('');
        setFilteredSkills(skills);
      }
      filtered = filtered.filter((skill) => skill.atribute === selectedAtribute);
    }

    if (searchTerm) {
      filtered = filtered.filter((skill) => skill.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    setFilteredSkills(filtered);
  }, [selectedAtribute, searchTerm, skills]);

  const formatAtribute = (atribute: string) => {
    const attributesMap: Record<string, string> = {
      STRENGTH: 'Força',
      DEXTERITY: 'Destreza',
      VITALITY: 'Constituição',
      INTELLIGENCE: 'Inteligência',
      PRESENCE: 'Presença',
    };
    return attributesMap[atribute] || '';
  };

  return (
    <div className="bg-dark-bg-secondary p-5 w-full text-foreground rounded-2xl border-2 border-border space-y-10">
      <h1 className="text-3xl font-bold">Visualizar Perícias</h1>

      <div className="flex flex-col space-y-5">
        <h2 className="text-2xl">Filtro:</h2>

        <div className="flex flex-col space-y-2">
          <Select onValueChange={setSelectedAtribute} value={selectedAtribute}>
            <SelectTrigger className="w-[300px]">
              <SelectValue placeholder="Selecione um atributo" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Atributos</SelectLabel>
                <SelectItem value="all">Todos</SelectItem>
                {atributes.map((atribute) => (
                  <SelectItem key={atribute.value} value={atribute.value}>
                    {atribute.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {selectedAtribute && (
            <label className="text-base ml-2 text-primary-foreground font-bold">
              Filtrando por {formatAtribute(selectedAtribute)}
            </label>
          )}
        </div>

        <Input
          type="text"
          placeholder="Buscar por nome da perícia"
          className="p-2 border-2 bg-card border-border rounded  w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="border-2 border-border">
        {filteredSkills.length === 0 ? (
          <p className="p-5 text-xl">Nenhuma habilidade encontrada.</p>
        ) : (
          filteredSkills.map((skill) => (
            <div key={skill.name} className="space-y-5 p-5 border-b border-border">
              <div>
                <h2 className="text-2xl font-semibold">{skill.name}</h2>
                {skill.atribute && <p className="text-sm mt-2">Atributo: {formatAtribute(skill.atribute)}</p>}
                <div className="text-sm mt-1">
                  {skill.needs_kit && <p>Precisa de kit</p>}
                  {skill.carry_peanalty && <p>Penalidade de carga</p>}
                  {skill.only_trained && <p>Apenas treinados</p>}
                </div>
              </div>
              <div>
                <h3 className="font-semibold">Descrição:</h3>
                <p className="text-base" dangerouslySetInnerHTML={{ __html: skill.description }}></p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
