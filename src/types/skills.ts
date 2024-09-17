export type Skills = {
  name: string;
  description: string;
  atribute: string;
  needs_kit: boolean;
  carry_peanalty: boolean;
  only_trained: boolean;
  is_custom: boolean;
};

export type SkillCharacter = {
  name: string;
  atribute: 'STRENGTH' | 'DEXTERITY' | 'VITALITY' | 'INTELLIGENCE' | 'PRESENCE';
  value: number;
  trainingLevel: 'none' | 'trained' | 'veteran' | 'expert';
  alterations: SkillAlterationObject[];
};

export type SkillAlterationObject = {
  value: number;
  modificationName?: string;
  modification?: string;
  featName?: string;
  feat?: string;
  itemName?: string;
  item?: number;
  otherName?: string;
};
