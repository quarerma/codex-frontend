import { useQuery } from '@tanstack/react-query';
import { getCharacter, getUserCharacter } from '../../api/fetch/character';
import { useParams } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
export default function CharacterPage() {
  const id = useParams().id;

  const { data: character } = useQuery({
    queryKey: ['character', id],
    queryFn: () => getCharacter(id),
  });

  return (
    <div>
      <ReactQueryDevtools initialIsOpen={false} />
      <h1>Character</h1>
    </div>
  );
}
