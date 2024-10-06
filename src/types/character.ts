import { Feat } from './feat';
import { Ritual } from './ritual';
import { SkillCharacter } from './skills';

export type Character = {
  id: string;

  name: string;
  level: number;

  class: { name: string; id: string };

  subclass: { name: string; id: string };

  origin: {
    id: string;
    name: string;
    description: string;
    feat: Feat;
  };

  owner: { id: string; username: string };
  atributes: AtributesJson;

  current_effort: number;
  max_effort: number;
  effortInfo: { alterations: { name: string; value: number }[]; valuePerLevel: number };

  current_health: number;
  max_health: number;
  healthInfo: { alterations: { name: string; value: number }[]; valuePerLevel: number };

  current_sanity: number;
  max_sanity: number;

  defense: number;
  speed: number;

  attacks: Attack[];
  feats: { feat: Feat; usingAfinity: boolean }[];
  skills: SkillCharacter[];

  proficiencies: string[];
  rituals: { ritual: Ritual; ritual_cost: number }[];

  campaign: {
    id: string;
    name: string;
    ownerId: string;
  };
  num_of_skills: number;
};

export type Attack = {
  name: string;
  local_id: string;
  skill: string;
  roll_bonus?: number;
  damage_dies: string[];
  critical_margin: number;
  critical_multiplier: number;
  extra_damage: string[];
  alterations: AlterationObject[];
};

export type AlterationObject = {
  item?: number;
  itemName?: string;
  modificationName?: string;
  modification?: string;
  featName?: string;
  feat?: string;
};

export type AtributesJson = {
  strength: number;
  dexterity: number;
  vitality: number;
  intelligence: number;
  presence: number;
  alterations: AlterationObject[];
};
