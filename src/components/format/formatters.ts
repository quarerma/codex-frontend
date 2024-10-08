import { Atributes } from '../../types/character-upgrades';
import { damageTypes } from '../../types/damage';
import { trainingLevels } from '../../types/skills';

export function formatDamageType(damage: string) {
  const index = damageTypes.findIndex((damageType) => damageType.value === damage);

  return damageTypes[index].label;
}

export const formatAtribute = (atribute: string) => {
  return Atributes.find((item) => item.value === atribute);
};

export const formatTrainingLevel = (trainingLevel: string) => {
  return trainingLevels.find((item) => item.value === trainingLevel);
};
