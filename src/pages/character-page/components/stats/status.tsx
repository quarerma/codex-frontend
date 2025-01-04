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
      <div className="flex flex-col   pr-10 w-fit border-r border-primary">
        <div className="flex items-center justify-center gap-x-2 ">
          <span className="text-3xl font-medium">{character?.name}</span>
          <DeleteCharacter />
        </div>
        <h1 className="font-extralight text-xl mt-5">Criado por: {character?.owner.id === user?.id ? 'Você' : `${character?.owner.username}`} </h1>
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
