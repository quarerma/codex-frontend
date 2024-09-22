import { Trash2Icon } from 'lucide-react';
import { User } from '../../../../types/user';
import { deleteCharacter } from '../../../../api/fetch/character';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCharacter } from '../../character-page';
import StatsInfo from './stats-info';
interface StatusProps {
  user: User;
}
export default function Status({ user }: StatusProps) {
  const { character } = useCharacter();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);

  const handleDeleteCharacter = async () => {
    try {
      await deleteCharacter(character.id);

      queryClient.invalidateQueries({
        queryKey: ['character', character.id],
      });
      queryClient.invalidateQueries({
        queryKey: ['characters'],
      });

      navigate('/characters');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col w-fit items-start left-0 ">
      <div className="flex flex-col 2xl:pr-32 xl:pr-12 md:pr-8 pr-4  w-fit border-r border-primary">
        <div className="flex items-center justify-center gap-x-5">
          <div className="2xl:w-[80px] 2xl:h-[80px] xl:h-[60px] xl:w-[60px] rounded-full bg-[#D9D9D9]/60"></div>
          <span className="text-4xl font-medium">{character?.name}</span>
          {<Trash2Icon onClick={() => setOpenModal(!openModal)} className="w-6 h-6 text-red-700 cursor-pointer" />}
        </div>
        <h1 className="font-extralight text-2xl text-center mt-5">
          Criado por: {character?.owner.id === user?.id ? 'Você' : `${character?.owner.username}`}{' '}
        </h1>
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
      {openModal && (
        <div
          onClick={() => setOpenModal(false)}
          className="fixed top-0 z-20 left-0 w-screen h-screen bg-black/90 flex items-center justify-center"
        >
          <div className="bg-dark-bg-secondary border-border border-2 z-50 p-10 rounded-xl">
            <h1 className="text-3xl font-semibold text-center">Você tem certeza que deseja deletar esse personagem?</h1>
            <h1 className="text-xl text-red-700 font-semibold text-center mt-2">
              Essa ação é irreversível e não pode ser desfeita.
            </h1>
            <div className="flex justify-center mt-5 space-x-5">
              <button onClick={handleDeleteCharacter} className="bg-red-700 text-white p-2 rounded-md hover:bg-red-900">
                Sim
              </button>
              <button
                onClick={() => setOpenModal(false)}
                className="bg-primary text-white p-2 rounded-md hover:bg-primary"
              >
                Não
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
