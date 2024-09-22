import { Link } from 'react-router-dom';
import { Character } from '../../../types/character';

interface CharacterCardProps {
  character: Character;
}

export default function CharacterCard({ character }: CharacterCardProps) {
  console.log(character);
  return (
    <Link
      to={`/characters/${character.id}`}
      className="bg-dark-bg-secondary space-x-5  items-center w-[95%]  hover:scale-105 duration-300 text-sm flex   rounded-2xl border border-primary text-foreground font-oswald px-5 py-5"
    >
      <div className="w-[40%] h-full rounded-xl  bg-[#D9D9D9]/30"></div>
      <div className="flex flex-col items-start h-full space-y-2">
        <h1 className="text-3xl">{character.name}</h1>
        <div className="flex flex-col font-inter font-extralight">
          <span>
            Vida: {character.current_health} / {character.max_health}
          </span>
          <span>
            PE: {character.current_effort} / {character.max_effort}
          </span>
          <span>
            SAN: {character.current_sanity} / {character.max_sanity}
          </span>
        </div>
      </div>
    </Link>
  );
}
