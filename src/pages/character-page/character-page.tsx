import { useQuery } from '@tanstack/react-query';
import { getCharacter, getUserCharacter } from '../../api/fetch/character';
import NavBar from '../../components/global/navbar';
import { useParams } from 'react-router-dom';
import { getUserById } from '../../api/fetch/user';
import Status from './components/status';
import CharacterAtributes from './components/atributes';

import CharacterSkills from './components/character-skills';
import CharacterFeats from './components/character-feat';
import { useState } from 'react';
import CharacterRituals from './components/character-rituals';

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

  const navBar = [
    { name: 'Poderes', value: 0 },
    { name: 'Rituais', value: 1 },
    { name: 'Inventário', value: 2 },
    { name: 'Ataques', value: 3 },
  ];

  const [selected, setSelected] = useState(0);

  const getComponent = (value: number) => {
    if (!character) return <></>;
    switch (value) {
      case 0:
        return <CharacterFeats character={character} />;
      case 1:
        return <CharacterRituals character={character} />;
      case 2:
        return null;
      case 3:
        return null;
      default:
        return null;
    }
  };
  return (
    character &&
    user && (
      <div className="w-screen min-h-screen font-oswald bg-dark-bg space-y-5">
        <NavBar />
        <div className="flex flex-col text-foreground max-h-[92vh] overflow-y-hidden ml-20 mr-20">
          <div className="items-center w-full space-x-32 text-2xl h-[5vh] flex">
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
          <div className="mt-5 flex h-full  space-x-28 overflow-hidden overflow-x-hidden">
            <Status character={character} user={user} />
            <CharacterAtributes character={character} />
            <CharacterSkills character={character} />
            <div className="flex flex-col ">
              <div className="flex justify-between w-fit space-x-10">
                {navBar.map((item) => (
                  <div key={item.value} className="flex flex-col items-center space-y-2">
                    <h1
                      onClick={() => setSelected(item.value)}
                      className={`cursor-pointer text-2xl ${
                        selected === item.value ? 'text-primary' : 'text-white/30'
                      }`}
                    >
                      {item.name}
                    </h1>
                    <div className={`w-20 h-1 bg-primary ${selected === item.value ? 'visible' : 'invisible'}`}></div>
                  </div>
                ))}
              </div>
              <div className="max-w-[500px] mt-2">{getComponent(selected)}</div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
