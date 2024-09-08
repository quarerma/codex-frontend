export type ClassModel = {
  id: string;
  name: string;
  description: string;
  number_of_skills: number;
  hitPointsPerLevel: number;
  SanityPointsPerLevel: number;
  effortPointsPerLevel: number;
  initialHealth: number;
  initialSanity: number;
  initialEffort: number;
  initialFeats: string[];
  proficiencies: string[];
};

export const equipmentProficience = [
  { label: 'Armas simples', value: 'SIMPLE' },
  { label: 'Armas táticas', value: 'TATICAL' },
  { label: 'Armas pesadas', value: 'HEAVY' },
  { label: 'Armaduras leves', value: 'LIGHT_ARMOR' },
  { label: 'Armaduras pesadas', value: 'HEAVY_ARMOR' },
];
