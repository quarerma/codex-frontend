import { useQuery } from '@tanstack/react-query';
import { getSubclasses } from '../../../../api/fetch/subclass';
import { useEffect, useState } from 'react';
import { Subclass } from '../../../../types/sublass';
import { Input } from '../../../../components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../../../../components/ui/select';

import SubclassModel from './subclass-model';
import { ClassModel } from '../../../../types/class';
import { get } from '../../../../api/axios';

export default function ReadSubClasses() {
  const { data: subclasses = [] } = useQuery({
    queryKey: ['subclasses'],
    queryFn: getSubclasses,
  });

  const { data: classes = [] } = useQuery({
    queryKey: ['classes'],
    queryFn: async () => (await get('classes')) as ClassModel[],
  });

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredSubclasses, setFilteredSubclasses] = useState<Subclass[]>(subclasses);
  const [selectedClass, setSelectedClass] = useState<string>('');

  useEffect(() => {
    let filtered = subclasses;

    if (searchTerm) {
      filtered = filtered.filter((skill) => skill.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (selectedClass !== 'all' && selectedClass) {
      filtered = filtered.filter((subclass) => subclass.class.name === selectedClass);
    }

    setFilteredSubclasses(filtered);
  }, [searchTerm, subclasses, selectedClass]);

  return (
    <div className="bg-dark-bg-secondary font-oswald p-5 w-full text-foreground rounded-2xl border-2 border-border space-y-10">
      <h1 className="text-3xl font-bold">Visualizar Subclasses</h1>

      <div className="flex flex-col space-y-5">
        <h2 className="text-2xl">Filtro:</h2>

        <Input
          type="text"
          placeholder="Buscar por nome da subclasse"
          className="p-2 border-2 bg-card border-border rounded  w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="flex flex-col space-y-2">
          <Select onValueChange={setSelectedClass} value={selectedClass}>
            <SelectTrigger className="w-[300px]">
              <SelectValue placeholder="Selecione uma classe" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Classes</SelectLabel>
                <SelectItem value="all">Todos</SelectItem>
                {classes.map((classes) => (
                  <SelectItem key={classes.id} value={classes.name}>
                    {classes.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {selectedClass && <label className="text-base ml-2 text-primary-foreground font-bold">Subclasses de {selectedClass}</label>}
        </div>
      </div>

      <div className="border-2 border-border">
        {filteredSubclasses?.map((subclass) => (
          <div className="border-b-2 border-border" key={subclass.id}>
            <SubclassModel {...subclass} />
          </div>
        ))}
      </div>
    </div>
  );
}
