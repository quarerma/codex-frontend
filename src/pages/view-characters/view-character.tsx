import { useEffect, useState } from 'react';
import NavBar from '../../components/global/navbar';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getUserCharacter } from '../../api/fetch/character';
import { useQuery } from '@tanstack/react-query';
import CharacterPortrait from './components/character-portrait';
import { Character } from '../../types/character';

export default function ViewCharacters() {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const { data: characters } = useQuery({
    queryKey: ['characters'],
    queryFn: getUserCharacter,
  });

  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);

  useEffect(() => {
    if (characters) {
      setFilteredCharacters(
        characters.filter((character) => character.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
  }, [searchTerm, characters]);
  return (
    <div className="max-w-screen min-h-screen font-oswald bg-dark-bg space-y-10">
      <NavBar />
      <div className="flex justify-between  items-center text-foreground   ml-20 pb-10 mr-20 ">
        <div className="flex ">
          <div className=" flex-col border-b-2 border-border">
            <input
              type="text"
              placeholder="Buscar por nome..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className=" placeholder:text-foreground placeholder:text-4xl placeholder:font-extrabold text-3xl  bg-transparent w-full focus:outline-none"
            />
            <div className="w-full h-[1px] drop-shadow-xl bg-white-text"></div>
          </div>
          <FaSearch className="text-2xl" />
        </div>
        <Link
          to={'/create-character'}
          className="text-foreground text-2xl  text-center font-semibold px-10 py-1 rounded-xl hover:bg-primary-foreground bg-dark-bg-secondary border-[1px] border-primary"
        >
          Criar Personagem
        </Link>
      </div>
      <div className="grid grid-cols-3   auto-rows-[200px] gap-14 ml-20 mr-20">
        {filteredCharacters.map((character, index) => (
          <div key={index} className="flex w-full  justify-center">
            <CharacterPortrait character={character} />
          </div>
        ))}
      </div>
    </div>
  );
}
