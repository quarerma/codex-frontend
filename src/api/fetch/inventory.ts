import { Inventory } from '../../types/inventory';
import { get, patch } from '../axios';

export async function getInventory(characterId: string) {
  try {
    const params = new URLSearchParams({ characterId });

    return (await get('inventory', { params })) as Inventory;
  } catch (error) {
    throw error;
  }
}

export async function addInventoryItem(characterId: string, itemId: number) {
  try {
    const params = new URLSearchParams();
    params.append('characterId', characterId);
    params.append('id', itemId.toString());

    return await patch('inventory/add-item', {}, { params });
  } catch (error) {
    throw error;
  }
}

export async function removeIventoryItem(slotId: string, characterId: string) {
  try {
    const params = new URLSearchParams();
    params.append('characterId', characterId);
    params.append('slotId', slotId);

    return await patch('inventory/remove-item', {}, { params });
  } catch (error) {
    throw error;
  }
}
