import { useEffect, useState } from 'react';
import { useCharacterCreation } from '../create-character';

import { Feat } from '../../../types/feat';
import { getInitialFeats } from '../../../api/fetch/classes';
import { useQuery } from '@tanstack/react-query';
import { CreateComponentProps } from '../props/create-component';

interface OriginProps {
  watch: CreateComponentProps['watch'];
}
export default function DeafultFeats({ watch }: OriginProps) {
  const { selectedClass, selectedSubclass, selectedOrigin } = useCharacterCreation();

  const [defaultFeats, setDefaultFeats] = useState<Feat[]>([]);

  const { data: initialClassFeats = [], refetch } = useQuery({
    queryKey: ['initialClassFeats', selectedClass?.id],
    queryFn: () => (selectedClass ? getInitialFeats(selectedClass.id) : []),
    enabled: !!selectedClass,
  });

  useEffect(() => {
    async function fetchFeats() {
      if (selectedClass) {
        await refetch();
        setDefaultFeats((prevDefaultFeats) => [...prevDefaultFeats, ...initialClassFeats]);
      }
      if (selectedSubclass) {
        const subclassFeats = selectedSubclass.subclassFeats;
        const characterLevel = watch('level');

        const filteredSubclassFeats = subclassFeats.filter(
          (feat) => feat.levelRequired <= (characterLevel == 99 ? 20 : characterLevel / 5)
        );

        const filterd = filteredSubclassFeats.map((feat) => feat.feat);

        setDefaultFeats((prevDefaultFeats) => [...prevDefaultFeats, ...filterd]);
      }
      if (selectedOrigin) {
        const originFeats = selectedOrigin.feats;
        setDefaultFeats((prevDefaultFeats) => [...prevDefaultFeats, originFeats]);
      }
    }

    fetchFeats();
  }, [selectedClass, selectedSubclass, selectedOrigin, watch('level')]);

  return (
    <div className="mt-2 ml-5 flex flex-col space-y-5">
      {defaultFeats.length > 0 ? (
        defaultFeats.map((feat, index) => (
          <div className="border-2 border-muted p-3 flex justify-between items-center" key={index}>
            <div>{feat.name}</div>
          </div>
        ))
      ) : (
        <span className="mt-2 italic -ml-5">
          Selecione a classe, subclasse e origem para os poderes aparecerem aqui!
        </span>
      )}
    </div>
  );
}
