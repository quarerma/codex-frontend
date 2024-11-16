import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { ClassModel, equipmentProficience } from '../../../../types/class';
import { Input } from '../../../../components/ui/input';
import ReadInitialFeats from './initial-class-feats';
import { get } from '../../../../api/axios';

const proficiencies = equipmentProficience;
export function formatProficiencie(value: string) {
  const index = proficiencies.findIndex((proficiency) => proficiency.value === value);

  return proficiencies[index].label;
}
export default function ReadClasses() {
  const { data: classes = [] } = useQuery({
    queryKey: ['classes'],
    queryFn: async () => (await get('classes')) as ClassModel[],
  });

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredSubclasses, setFilteredSubclasses] = useState<ClassModel[]>(classes);

  useEffect(() => {
    let filtered = classes;

    if (searchTerm) {
      filtered = filtered.filter((skill) => skill.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    setFilteredSubclasses(filtered);
  }, [searchTerm, classes]);
  return (
    <div className="bg-dark-bg-secondary flex flex-col space-y-10 p-5 w-full rounded-2xl h-fit border-2 border-border">
      <h1 className="text-3xl font-bold">Exibindo classes</h1>
      <div className="flex flex-col space-y-5">
        <h2 className="text-2xl">Filtro:</h2>

        <Input type="text" placeholder="Buscar por nome da perícia" className="p-2 border-2 bg-card border-border rounded  w-full" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>
      {filteredSubclasses.map((classModel, index) => (
        <div key={index} className="space-y-5 p-5 border-2 border-border">
          <div>
            <h2 className="text-3xl font-bold">{classModel.name}</h2>
          </div>
          <div>
            <h3 className="font-bold text-xl">Descrição:</h3>
            <p className="text-base" dangerouslySetInnerHTML={{ __html: classModel.description }}></p>
          </div>
          <div className="flex flex-col space-y-1">
            <h1 className="text-xl text-green-500">Cálculo de Vida</h1>
            <h1>
              Vida inicial: {classModel.initialHealth} + {classModel.hitPointsPerLevel} + Fortitude
            </h1>
            <h1>Vida por NEX: {classModel.hitPointsPerLevel} + Fortitude</h1>
          </div>
          <div className="flex flex-col space-y-1">
            <h1 className="text-xl text-yellow-400">Cálculo de PE</h1>
            <h1>
              PE inicial: {classModel.initialEffort} + {classModel.effortPointsPerLevel} + Presença
            </h1>
            <h1>PE por NEX: {classModel.effortPointsPerLevel} + Presença</h1>
          </div>
          <div className="flex flex-col space-y-1">
            <h1 className="text-xl text-blue-500">Cálculo de Sanidade</h1>
            <h1>Sanidade inicial: {classModel.initialSanity}</h1>
            <h1>Sanidade por NEX: {classModel.SanityPointsPerLevel}</h1>
          </div>
          <div className="flex flex-col space-y-1">
            <h1 className="text-xl text-orange-600">Cálculo de Perícias</h1>
            <h1>Perícias iniciais: {classModel.number_of_skills} + Intelecto</h1>
          </div>
          <div className="flex flex-col ">
            <h1 className="text-xl">Proficiências: </h1>
            <ul className="list-inside list-disc ml-2">{classModel.proficiencies && classModel.proficiencies.map((proficiency, index) => <li key={index}>{formatProficiencie(proficiency)}</li>)}</ul>
          </div>
          <div className="flex flex-col space-y-2">
            <h1 className="text-2xl font-bold text-rose-600">Poderes Iniciais</h1>
            <ReadInitialFeats classId={classModel.id} />
          </div>
        </div>
      ))}
    </div>
  );
}
