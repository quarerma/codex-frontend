import { useQuery } from '@tanstack/react-query';
import { getSubclasses } from '../../../../api/fetch/subclass';
import { useEffect, useState } from 'react';
import { Subclass } from '../../../../types/sublass';
import { Input } from '../../../../components/ui/input';
import { getClasses } from '../../../../api/fetch/classes';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../../../../components/ui/select';

export default function ReadSubClasses() {
  const { data: subclasses = [] } = useQuery({
    queryKey: ['subclasses'],
    queryFn: getSubclasses,
  });

  const { data: classes = [] } = useQuery({
    queryKey: ['classes'],
    queryFn: getClasses,
  });

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredSubclasses, setFilteredSubclasses] = useState<Subclass[]>(subclasses);
  const [selectedClass, setSelectedClass] = useState<string>('');

  useEffect(() => {
    let filtered = subclasses;

    if (searchTerm) {
      filtered = filtered.filter((skill) => skill.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    setFilteredSubclasses(filtered);
  }, [searchTerm, subclasses]);

  return (
    <div className="bg-dark-bg-secondary font-oswald p-5 w-full text-foreground rounded-2xl border-2 border-border space-y-10">
      <h1 className="text-3xl font-bold">Visualizar Perícias</h1>

      <div className="flex flex-col space-y-5">
        <h2 className="text-2xl">Filtro:</h2>

        <Input
          type="text"
          placeholder="Buscar por nome da perícia"
          className="p-2 border-2 bg-card border-border rounded  w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="flex flex-col space-y-2">
          <Select onValueChange={setSelectedClass} value={selectedClass}>
            <SelectTrigger className="w-[300px]">
              <SelectValue placeholder="Selecione um atributo" />
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
          {selectedClass && (
            <label className="text-base ml-2 text-primary-foreground font-bold">Subclasses de {selectedClass}</label>
          )}
        </div>
      </div>

      <div className="border-2 border-border">
        {filteredSubclasses?.map((subclass) => (
          <div key={subclass.id} className="border-2 border-border p-5 text-xl space-y-10">
            <h1 className="text-3xl font-bold">{subclass.name}</h1>
            <p>{subclass.description}</p>
            <p>{subclass.class.name}</p>
            <p dangerouslySetInnerHTML={{ __html: subclass.class.description }}></p>

            <div>
              Poderes de Subclasse:
              <ul>
                {subclass.subclassFeats.map((feat, index) => (
                  <li className="text-sm mt-2" key={index}>
                    <h1 className="text-red-500 ">Nex {feat.levelRequired === 20 ? 99 : feat.levelRequired * 5}%:</h1>
                    <div className="flex flex-col space-y-2 ">
                      <h1>{feat.feat.name}:</h1>
                      <p dangerouslySetInnerHTML={{ __html: feat.feat.description }}></p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
