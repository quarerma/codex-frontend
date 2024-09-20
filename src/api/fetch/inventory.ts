import axios from 'axios';
import Cookies from 'js-cookie';
import { Inventory, InventorySlot } from '../../types/inventory';

const API_URL = process.env.API_URL;

export async function getInventory(characterId: string) {
  try {
    const jwt = Cookies.get('jwt');
    const response = await axios.get(`${API_URL}inventory/${characterId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return response.data as Inventory;
  } catch (error) {
    throw error;
  }
}

export async function addInventoryItem(characterId: string, itemId: number) {
  try {
    const jwt = Cookies.get('jwt');
    const response = await axios.patch(`${API_URL}inventory/add-item/${characterId}/${itemId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return response.data as InventorySlot;
  } catch (error) {
    throw error;
  }
}
