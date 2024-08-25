export type ClassModel = {
  id: string;
  name: string;
  description: string;
  hitPointsPerLevel: number;
  SanityPointsPerLevel: number;
  effortPointsPerLevel: number;
  initialHealth: number;
  initialSanity: number;
  initialEffort: number;
  initialFeats: string[];
  proficiencies: Proficiency[];
};

export enum Proficiency {
  SIMPLE = 'Armas simples',
  TACTICAL = 'Arnas táticas',
  HEAVY = 'Armas pesadas',
  LIGHT_ARMOR = 'Armaduras leves',
  HEAVY_ARMOR = 'Armaduras pesadas',
}
