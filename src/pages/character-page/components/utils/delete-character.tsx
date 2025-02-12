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
import { Trash2Icon } from 'lucide-react';
import { Input } from '../../../../components/ui/input';
import { useQueryClient } from '@tanstack/react-query';
import { deleteCharacter } from '../../../../api/fetch/character';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCharacter } from '../../character-page';

export default function DeleteCharacter() {
  const { character } = useCharacter();
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
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
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger onClick={() => setIsOpen(true)}>
        <Trash2Icon className="w-6 h-6 text-red-700 cursor-pointer" />
      </AlertDialogTrigger>
      <AlertDialogContent className="text-white border border-border">
        <AlertDialogHeader className="text-3xl">Tem certeza que deseja excluir o personagem?</AlertDialogHeader>
        <AlertDialogDescription className="flex flex-col gap-y-5">
          <span className="text-2xl">Essa ação é irreversível e não poderá ser desfeita, você perderá todos os dados do personagem.</span>
          <div className="space-y-2">
            <h1>Digite o nome do personagem para confirmar:</h1>
            <Input className="text-xl" value={confirmationText} onChange={(e) => setConfirmationText(e.target.value)} placeholder="Nome do personagem" />
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
  );
}
