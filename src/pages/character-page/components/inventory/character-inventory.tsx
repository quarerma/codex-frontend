import { useQuery } from '@tanstack/react-query';
import { useCharacter } from '../../character-page';
import { getInventory } from '../../../../api/fetch/inventory';
import { credit } from '../../../../types/inventory';
import { patent } from '../../../../types/patent';
import { Dialog, DialogTrigger } from '../../../../components/ui/dialog';

const formatPatent = (inventoryPatent: string) => {
  const index = patent.findIndex((patent) => patent.value === inventoryPatent);
  return patent[index].label;
};

const formatCredit = (inventoryCredit: string) => {
  const index = credit.findIndex((credit) => credit.value === inventoryCredit);
  return credit[index].label;
};

export default function CharacterInventory() {
  const { character } = useCharacter();

  const { data: inventory } = useQuery({
    queryKey: ['inventory', character.id],
    queryFn: () => getInventory(character.id),
    enabled: !!character.id,
  });

  return (
    inventory && (
      <div
        className="overflow-y-auto mt-2 flex flex-col space-y-1 max-h-[75vh]"
        style={{
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}
      >
        <div className="flex text-lg justify-between">
          <span>
            <span className="text-primary">Limite de Itens:</span> 1 2 3 4
          </span>
          <span>
            <span className="text-primary">Carga Máxima:</span> {inventory.currentValue} / {inventory.maxValue}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span>
            <span className="text-primary">Patente:</span> {formatPatent(inventory.patent)}
          </span>
          <span>
            {' '}
            <span className="text-primary">Limite de Crédito:</span> {formatCredit(inventory.credit)}
          </span>
          <Dialog>
            <DialogTrigger className="bg-primary text-primary-foreground p-1">+ Adicionar</DialogTrigger>
          </Dialog>
        </div>
        {inventory.slots.length > 0 ? (
          <div className="flex flex-col space-y-1">
            {inventory.slots.map((slot) => (
              <div key={slot.id} className="flex justify-between items-center">
                <span>{slot.equipment.name}</span>
                <span>{slot.uses}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-3xl italic ">Sem itens</div>
        )}
      </div>
    )
  );
}
