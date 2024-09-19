import { CharacterUpgrade } from './character-upgrades';

export const weaponType = [
  { value: 'MELEE', label: 'Corpo a corpo' },
  { value: 'BOLT', label: 'Disparo' },
  { value: 'BULLET', label: 'Fogo' },
];

export const weaponCategory = [
  { value: 'SIMPLE', label: 'Simples' },
  { value: 'TATICAL', label: 'Tático' },
  { value: 'HEAVY', label: 'Pesado' },
];

export const handType = [
  { value: 'LIGHT', label: 'Leve' },
  { value: 'ONE_HANDED', label: 'Uma mão' },
  { value: 'TWO_HANDED', label: 'Duas mãos' },
];

export const itemType = [
  { value: 'ACESSORY', label: 'Acessório' },
  { value: 'WEAPON', label: 'Arma' },
  { value: 'ARMOR', label: 'Armadura' },
  { value: 'OPERATIONAL_EQUIPMENT', label: 'Equipamento Operacional' },
  { value: 'PARANORMAL_EQUIPMENT', label: 'Equipamento Paranormal' },
  { value: 'EXPLOSIVE', label: 'Explosivo' },
  { value: 'CURSED_ITEM', label: 'Item Amaldiçoado' },
  { value: 'AMMO', label: 'Munição' },
  { value: 'DEFAULT', label: 'Padrão' },
];

export type Equipment = {
  id: number;
  name: string;
  description: string;
  is_custom: boolean;
  characterUpgrades: CharacterUpgrade[];
  category: string;
  slots: number;
  type: string;
  weight: number;
  num_of_uses: number;
  Weapon?: {
    damage: number;
    damage_type: string;
    weapon_type: string;
    weapon_category: string;
    hand_type: string;
    range: number;
    critical_multiplier: number;
    critical_range: number;
  };
  CusedItem?: {
    element: string;
  };
};
