import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { getCampaignRituals } from '../../../../../api/fetch/rituals';
import { Ritual } from '../../../../../types/ritual';
import { Input } from '../../../../../components/ui/input';
import { useParams } from 'react-router-dom';

export default function ReadRituals() {
  const { id: campaignId } = useParams();
  const { data: rituals = [] } = useQuery({
    queryKey: ['rituals', campaignId],
    queryFn: () => getCampaignRituals(campaignId || ''),
  });

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredRituals, setFilteredRituals] = useState<Ritual[]>(rituals);

  useEffect(() => {
    let filtered = rituals;

    if (searchTerm) {
      filtered = filtered.filter((ritual) => ritual.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    setFilteredRituals(filtered);
  }, [searchTerm, rituals]);

  return (
    <div className="bg-dark-bg-secondary  p-5 w-full text-foreground rounded-2xl border-2 border-border space-y-10">
      <h1 className="text-5xl font-bold">Visualizar Rituais</h1>

      <div className="flex flex-col space-y-5">
        <h2 className="text-4xl">Filtro:</h2>

        <Input type="text" placeholder="Buscar por nome do ritual" className="p-2 border-2 bg-card border-border rounded  w-full" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>

      <div className="border-2 border-border">
        {filteredRituals.length === 0 ? (
          <p className="p-5 text-3xl">Nenhum ritual encontrado.</p>
        ) : (
          filteredRituals.map((ritual, index) => (
            <div key={index} className="space-y-5 p-5 border-2 border-border">
              <div>
                <h2 className="text-4xl font-bold">{ritual.name}</h2>
              </div>
              <div>
                <h3 className="font-bold">Descrição:</h3>
                <p className="text-xl" dangerouslySetInnerHTML={{ __html: ritual.normalCastDescription }}></p>
              </div>
              <div></div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
