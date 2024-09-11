import { useQuery } from '@tanstack/react-query';
import { getInitialFeats } from '../../../../api/fetch/classes';

interface InitialFeatProps {
  classId: string;
}

export default function ReadInitialFeats({ classId }: InitialFeatProps) {
  const { data: initialFeats = [] } = useQuery({
    queryKey: ['initialFeats', classId],
    queryFn: () => getInitialFeats(classId),
  });

  return (
    <ul className="list-disc pl-6 flex flex-col space-y-5 ">
      {initialFeats.map((feat) => (
        <li key={feat.id}>
          <h1 className="font-normal text-xl">{feat.name}</h1>
          <p className="font-light" dangerouslySetInnerHTML={{ __html: feat.description }}></p>
        </li>
      ))}
    </ul>
  );
}
