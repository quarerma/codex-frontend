import { useQuery } from '@tanstack/react-query';
import { getCharacter } from '../../api/fetch/character';
import NavBar from '../../components/global/navbar';
import { useParams } from 'react-router-dom';
import { getUserById } from '../../api/fetch/user';
import Status from './components/stats/status';
import CharacterAtributes from './components/atributes';

import CharacterSkills from './components/character-skills';
import CharacterFeats from './components/feats/character-feat';
import { createContext, useContext, useEffect, useState } from 'react';
import CharacterRituals from './components/rituals/character-rituals';
import { Character } from '../../types/character';
import CharacterInventory from './components/inventory/character-inventory';
import CharacterAttacks from './components/attacks/character-attacks';

const CharacterContext = createContext<{
  character: Character;
} | null>(null);

export const useCharacter = () => {
  const context = useContext(CharacterContext);
  if (!context) {
    throw new Error('useCharacterCreation must be used within a CharacterCreationProvider');
  }
  return context;
};
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
        return <CharacterFeats />;
      case 1:
        return <CharacterRituals />;
      case 2:
        return <CharacterInventory />;
      case 3:
        return <CharacterAttacks />;
      default:
        return null;
    }
  };
  const [isUserValid, setIsUserValid] = useState(false);

  useEffect(() => {
    if (user && character) {
      if (user.id === character.owner.id) {
        setIsUserValid(true);
      } else {
        const isUserDM = character.campaign.ownerId === user.id;
        if (isUserDM) {
          setIsUserValid(true);
        }
      }
    }
  }, [user, character]);

  if (!character || !user)
    return (
      <div className="w-screen min-h-screen font-oswald bg-dark-bg space-y-5">
        <NavBar />
        <div className="flex justify-center items-center h-[70vh] space-x-5">
          <h1 className="text-white/30 font-semibold tracking-widest text-3xl">Loading</h1>

          <div className="w-10 h-10 border-b-2 border-l-2 border-primary rounded-full animate-spin"></div>
        </div>
      </div>
    );

  if (!isUserValid) {
    return (
      <div className="w-screen min-h-screen font-oswald bg-dark-bg space-y-5">
        <NavBar />
        <div className="flex justify-center items-center h-[70vh] space-x-5">
          <h1 className="text-white/30 font-semibold tracking-widest text-3xl">
            Você não tem permissão para acessar essa página
          </h1>
        </div>
      </div>
    );
  }
  return (
    <CharacterContext.Provider
      value={{
        character: character,
      }}
    >
      <div className="w-screen min-h-screen font-oswald bg-dark-bg space-y-5">
        <NavBar />
        <div
          className="flex flex-col text-foreground 2xl:max-h-[87vh] xl:max-h-[87vh] overflow-y-auto 2xl:ml-20 2xl:mr-20 xl:ml-10 xl:mr-10 lg:ml-5 lg:mr-5 ml-2 mr-2"
          style={{
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }}
        >
          <div className="items-center w-fit space-x-32 2xl:text-2xl xl:text-xl text-base  h-[5vh] flex">
            <h1 className="text-white/30 font-semibold tracking-widest 2xl:text-3xl xl:text-xl text-lg">
              Character Page
            </h1>
            <h1 className="flex items-center gap-x-2 font-extralight">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <span className="text-primary font-light">Campanha:</span>
              {character?.campaign.name}
            </h1>
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
          <div
            className="mt-5 lg:flex max-lg:flex-col max-lg:gap-y-20 h-full justify-between lg:space-x-20   overflow-x-hidden overflow-y-hidden"
            style={{
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
            }}
          >
            <div className="flex justify-between space-x-10">
              <Status user={user} />
              <CharacterAtributes />
            </div>
            <div className="flex justify-between spaxe-x-10 w-full">
              <CharacterSkills />
              <div className="flex flex-col items-center 2xl:max-w-[500px] xl:max-w-[400px] max-w-[300px] w-full ">
                <div className="flex justify-between  2xl:space-x-10 xl:space-x-5">
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
                <div className="2xl:max-w-[500px] xl:max-w-[400px] max-w-[300px] w-full  mt-2">
                  {getComponent(selected)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CharacterContext.Provider>
  );
}
