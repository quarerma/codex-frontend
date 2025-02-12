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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../../../components/ui/dropdown-menu';
import { post } from '../../../../api/axios';

const InventoryContect = createContext<{
  inventory: InventorySlot[];
  setInventory: React.Dispatch<React.SetStateAction<InventorySlot[]>>;
  handleAddItem: (slot: InventorySlot) => void;
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

  const { data: inventory, refetch } = useQuery({
    queryKey: ['inventory', character.id],
    queryFn: () => getInventory(character.id),
    enabled: !!character.id,
  });

  const [currentValue, setCurrentValue] = useState(0);
  const [inventorySlots, setInventorySlots] = useState<InventorySlot[]>([]);
  const [loading, setLoading] = useState(false);

  const updateCurrentValue = (slots: InventorySlot[]) => {
    const totalWeight = slots.reduce((acc, slot) => (slot.is_equipped ? acc + slot.weight : acc), 0);
    setCurrentValue(totalWeight);
  };

  useEffect(() => {
    if (inventory) {
      setInventorySlots(inventory.slots);
      updateCurrentValue(inventory.slots);
    }
  }, [inventory]);

  const handleRemoveItem = async (slotId: string) => {
    setLoading(true);
    try {
      setInventorySlots((prev) => prev.filter((slot) => slot.id !== slotId));
      updateCurrentValue(inventorySlots.filter((slot) => slot.id !== slotId));
    } catch (error) {
      console.error('Error removing item:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateItem = (slot: InventorySlot) => {
    setInventorySlots((prev) => prev.map((s) => (s.id === slot.id ? slot : s)));
    updateCurrentValue(inventorySlots);
  };

  const handleAddEmptySlot = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('characterId', character.id);

      const response = await post('inventory/create-empty-slot', {}, { params });
      setInventorySlots((prev) => [response, ...prev]);
      updateCurrentValue([response, ...inventorySlots]);
    } catch (error) {
      console.error('Error adding empty slot:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async (slot: InventorySlot) => {
    setLoading(true);
    try {
      setInventorySlots((prev) => [slot, ...prev]);
      updateCurrentValue([slot, ...inventorySlots]);
    } catch (error) {
      console.error('Error adding item:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    inventory && (
      <InventoryContect.Provider value={{ inventory: inventorySlots, setInventory: setInventorySlots, handleAddItem }}>
        <div className="mt-2 flex flex-col space-y-1">
          <div className="flex text-2xl justify-between">
            <span>
              <span className="text-primary">Limite de Itens:</span> 1 2 3 4
            </span>
            <span>
              <span className="text-primary">Carga Máxima:</span> {currentValue} / {inventory.maxValue}
            </span>
          </div>
          <div className="flex justify-between text-xl items-center">
            <h1>
              <span className="text-primary">Patente:</span> {formatPatent(inventory.patent)}
            </h1>
            <h1>
              <span className="text-primary">Limite de Crédito:</span> {formatCredit(inventory.credit)}
            </h1>
            <Dialog>
              <DropdownMenu>
                <DropdownMenuTrigger className="bg-primary text-primary-foreground p-1 mr-2">+ Adicionar</DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DialogTrigger className="w-full">
                    <DropdownMenuItem>
                      <span>Loja</span>
                    </DropdownMenuItem>
                  </DialogTrigger>
                  <DropdownMenuItem onClick={() => handleAddEmptySlot()}>Item customizado</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <AddItemModal />
            </Dialog>
          </div>
          {loading ? (
            <div className="text-center py-10 text-2xl italic">Atualizando...</div>
          ) : inventorySlots.length > 0 ? (
            <div
              className="flex flex-col space-y-1 max-h-[65vh] overflow-y-auto"
              style={{
                msOverflowStyle: 'none',
                scrollbarWidth: 'none',
              }}
            >
              {inventorySlots.map((slot) => (
                <div key={slot.id}>
                  <ItemInfo slot={slot} onRemoveItem={handleRemoveItem} onUpdateItem={handleUpdateItem} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-5xl italic">Sem itens</div>
          )}
        </div>
      </InventoryContect.Provider>
    )
  );
}
