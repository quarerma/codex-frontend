import { useQuery } from '@tanstack/react-query';

import { useEffect, useState } from 'react';

import { Input } from '../../../../components/ui/input';
import { getOrigins } from '../../../../api/fetch/origins';
import { Origin } from '../../../../types/origin';

export default function ReadOrigins() {
  const { data: origins = [] } = useQuery({
    queryKey: ['origins'],
    queryFn: getOrigins,
  });

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredOrigins, setFilteredOrigins] = useState<Origin[]>(origins);

  useEffect(() => {
    let filtered = origins;

    if (searchTerm) {
      filtered = filtered.filter((skill) => skill.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    setFilteredOrigins(filtered);
  }, [searchTerm, origins]);

  return (
    <div className="bg-dark-bg-secondary font-inter p-5 w-full text-foreground rounded-2xl border-2 border-border space-y-10">
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
      </div>

      <div className="border-2 border-border">
        {filteredOrigins.length === 0 ? (
          <p className="p-5 text-xl">Nenhuma habilidade encontrada.</p>
        ) : (
          filteredOrigins.map((origin, index) => (
            <div key={index} className="space-y-5 p-5 border-2 border-border">
              <div>
                <h2 className="text-2xl font-bold">{origin.name}</h2>
              </div>
              <div>
                <h3 className="font-bold">Descrição:</h3>
                <p className="text-base" dangerouslySetInnerHTML={{ __html: origin.description }}></p>
              </div>
              <div>
                <h1 className="text-xl font-bold">Perícias Treinadas</h1>
                <ul className="list-disc list-inside">
                  {origin.skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h1 className="text-xl font-bold">Poder de Origem</h1>
                <label className="flex space-x-3">
                  <h1>{origin.feats.name}:</h1>
                  <h1 dangerouslySetInnerHTML={{ __html: origin.feats.description }}></h1>
                </label>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
