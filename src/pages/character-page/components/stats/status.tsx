import { Trash2Icon } from 'lucide-react';
import { User } from '../../../../types/user';
import { deleteCharacter } from '../../../../api/fetch/character';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { useCharacter } from '../../character-page';
import StatsInfo from './stats-info';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from '../../../../components/ui/alert-dialog';
import { Input } from '../../../../components/ui/input';
import { useState } from 'react';
interface StatusProps {
  user: User;
}

export default function Status({ user }: StatusProps) {
  const { character } = useCharacter();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [confirmationText, setConfirmationText] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleDeleteCharacter = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    try {
      if (!confirmationText) {
        setError('Digite o nome do personagem para confirmar.');
        e.stopPropagation();
        return;
      }

      if (confirmationText !== character.name) {
        setError('O nome digitado não corresponde ao nome do personagem.');
        e.stopPropagation();
        return;
      }

      await deleteCharacter(character.id);

      queryClient.invalidateQueries({
        queryKey: ['character', character.id],
      });
      queryClient.invalidateQueries({
        queryKey: ['characters'],
      });

      setConfirmationText('');
      setError(null);
      setIsOpen(false);
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
          <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger onClick={() => setIsOpen(true)}>
              <Trash2Icon className="w-6 h-6 text-red-700 cursor-pointer" />
            </AlertDialogTrigger>
            <AlertDialogContent className="text-white border border-border">
              <AlertDialogHeader className="text-xl">Tem certeza que deseja excluir o personagem?</AlertDialogHeader>
              <AlertDialogDescription className="flex flex-col gap-y-5">
                <span className="text-lg">Essa ação é irreversível e não poderá ser desfeita, você perderá todos os dados do personagem.</span>
                <div className="space-y-2">
                  <h1>Digite o nome do personagem para confirmar:</h1>
                  <Input className="text-base" value={confirmationText} onChange={(e) => setConfirmationText(e.target.value)} placeholder="Nome do personagem" />
                  {error && <span className="text-red-500">{error}</span>}
                </div>
              </AlertDialogDescription>
              <AlertDialogFooter>
                <AlertDialogCancel
                  onClick={() => {
                    setError(null);
                    setConfirmationText('');
                  }}
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction onClick={(e) => handleDeleteCharacter(e)}>Deletar Personagem</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
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
