import { useQuery } from '@tanstack/react-query';
import { useCharacter } from '../../character-page';
import { getInventory } from '../../../../api/fetch/inventory';
import { credit, InventorySlot } from '../../../../types/inventory';
import { patent } from '../../../../types/patent';
import { Dialog, DialogTrigger } from '../../../../components/ui/dialog';
import AddItemModal from './add-item-modal';
import ItemInfo from './item-info';
import { createContext, useContext, useEffect, useState } from 'react';
import { formatCredit, formatPatent } from '../../../../components/format/formatters';

const InventoryContect = createContext<{
  inventory: InventorySlot[];
  setInventory: React.Dispatch<React.SetStateAction<InventorySlot[]>>;
} | null>(null);

export const useInventory = () => {
  const context = useContext(InventoryContect);
  if (!context) {
    throw new Error('useInventory must be used within a InventoryProvider');
  }
  return context;
};

export default function CharacterInventory() {
  const { character } = useCharacter();

  const { data: inventory } = useQuery({
    queryKey: ['inventory', character.id],
    queryFn: () => getInventory(character.id),
    enabled: !!character.id,
  });

  const [inventorySlots, setInventorySlots] = useState<InventorySlot[]>([]);

  useEffect(() => {
    if (inventory) {
      setInventorySlots(inventory?.slots);
    }
  }, [inventory]);

  const handleRemoveItem = (slotId: string) => {
    console.log(slotId);
    setInventorySlots((prev) => prev.filter((slot) => slot.id !== slotId));
  };

  return (
    inventory && (
      <InventoryContect.Provider value={{ inventory: inventorySlots, setInventory: setInventorySlots }}>
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
              <AddItemModal />
            </Dialog>
          </div>
          {inventory.slots.length > 0 ? (
            <div className="flex flex-col space-y-1">
              {inventorySlots?.map((slot) => (
                <div key={slot.id}>
                  <ItemInfo slot={slot} onRemoveItem={handleRemoveItem} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-3xl italic ">Sem itens</div>
          )}
        </div>
      </InventoryContect.Provider>
    )
  );
}
