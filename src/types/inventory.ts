import { AlterationObject } from './character';
import { Equipment } from './equipment';

export type Inventory = {
  inventoryId: string;

  currentValue: number;
  maxValue: number;
  alterations: AlterationObject[];

  credit: Credit;
  patent: Patent;

  slots: InventorySlot[];
};

export type InventorySlot = {
  id: string;

  equipment: Equipment;
  uses: number;
  category: number;
  local_name: string;
  is_equipped: boolean;
  alterations: AlterationObject[];
};
export type Credit = 'LOW' | 'MEDIUM' | 'HIGH' | 'UNLIMITED';

export type Patent = 'ROOKIE' | 'OPERATOR' | 'SPECIAL_AGENT' | 'OPERATION_OFFICER' | 'ELITE_AGENT';

export const credit = [
  { value: 'LOW', label: 'Baixo' },
  { value: 'MEDIUM', label: 'Médio' },
  { value: 'HIGH', label: 'Alto' },
  { value: 'UNLIMITED', label: 'Ilimitado' },
];
