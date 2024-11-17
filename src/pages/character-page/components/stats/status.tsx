import { Trash2Icon } from 'lucide-react';
import { User } from '../../../../types/user';

import { useCharacter } from '../../character-page';
import StatsInfo from './stats-info';

import { Input } from '../../../../components/ui/input';
import { useState } from 'react';
import DeleteCharacter from '../utils/delete-character';
interface StatusProps {
  user: User;
}

export default function Status({ user }: StatusProps) {
  const { character } = useCharacter();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col w-fit items-start left-0 ">
      <div className="flex flex-col 2xl:pr-32 xl:pr-12 md:pr-8 pr-4  w-fit border-r border-primary">
        <div className="flex items-center justify-center gap-x-5">
          <div className="2xl:w-[80px] 2xl:h-[80px] xl:h-[60px] xl:w-[60px] rounded-full bg-[#D9D9D9]/60"></div>
          <span className="text-4xl font-medium">{character?.name}</span>
          <DeleteCharacter />
        </div>
        <h1 className="font-extralight text-2xl text-center mt-5">Criado por: {character?.owner.id === user?.id ? 'Você' : `${character?.owner.username}`} </h1>
      </div>
      <div className="mt-20 text-3xl flex flex-col space-y-5">
        <StatsInfo current_value={character?.current_health} max_value={character?.max_health} type="HP" />
        <StatsInfo current_value={character?.current_effort} max_value={character?.max_effort} type="PE" />
        <StatsInfo current_value={character?.current_sanity} max_value={character?.max_sanity} type="SAN" />
        <div className="text-xl flex flex-col">
          <span className="text-2xl">NEX: {character.level * 5}%</span>
          <span>Deslocamento: {character?.speed}</span>
          <span>Defesa: {character?.defense}</span>
        </div>
      </div>
    </div>
  );
}
