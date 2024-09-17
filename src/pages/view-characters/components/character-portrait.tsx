import { Link } from 'react-router-dom';
import { Character } from '../../../types/character';

interface CampaignPortraitProps {
  character: Character;
}
export default function CharacterPortrait({ character }: CampaignPortraitProps) {
  return (
    <Link
      to={`${character.id}`}
      className="bg-dark-bg-secondary w-[95%] hover:drop-shadow-[0_4px_50px_rgba(255,255,0,0.37)] hover:scale-105 duration-300 text-sm flex flex-col space-y-3  rounded-2xl border border-primary text-foreground font-oswald px-5 py-5"
    >
      <div className="flex h-full space-x-2  ">
        <div className="flex flex-col items-center  space-y-2 h-full w-fit">
          <h1 className="font-bold text-2xl">NEX {character.level == 20 ? 99 : character.level * 5}%</h1>
          <div className="h-[150px] w-[120px] bg-[#D9D9D9]/30"></div>
        </div>
        <div className="space-y-1 h-full flex flex-col  font-bold w-full">
          <h1 className="text-4xl text-center">{character.name}</h1>
          <div className="flex items-center justify-center h-full">
            <span className="bottom-0 text-white/40 text-center text-2xl">
              {character.origin.name} | {character.class.name} / {character.subclass.name}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
