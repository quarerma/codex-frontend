import { useQuery } from '@tanstack/react-query';
import { getCharacter, getUserCharacter } from '../../api/fetch/character';
import NavBar from '../../components/global/navbar';
import { useParams } from 'react-router-dom';
import { getUserById } from '../../api/fetch/user';
import Status from './components/status';
import CharacterAtributes from './components/atributes';
export default function CharacterPage() {
  const id = useParams().id;

  const { data: character } = useQuery({
    queryKey: ['character', id],
    queryFn: () => getCharacter(id),
  });

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: getUserById,
  });

  return (
    character &&
    user && (
      <div className="max-w-screen min-h-screen font-oswald bg-dark-bg space-y-10">
        <NavBar />
        <div className="flex flex-col text-foreground  ml-20  mr-20 ">
          <div className=" items-center w-full space-x-32 text-2xl flex">
            <h1 className="text-white/30 font-semibold tracking-widest text-3xl">Character Page</h1>
            <h1 className="flex items-center gap-x-2 font-extralight">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <span className="text-primary font-light">Origem:</span>
              {character?.origin.name}
            </h1>
            <h1 className="flex items-center gap-x-2 font-extralight">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <span className="text-primary font-light">Classe:</span>
              {character?.class.name}
            </h1>
            <h1 className="flex items-center gap-x-2 font-extralight">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <span className="text-primary font-light">Subclasse:</span>
              {character?.subclass.name}
            </h1>
          </div>
          <div className="mt-10 flex space-x-20">
            <Status character={character} user={user} />
            <CharacterAtributes character={character} />
          </div>
        </div>
      </div>
    )
  );
}
