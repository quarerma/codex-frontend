import { Atributes } from '../../types/character-upgrades';
import { damageTypes } from '../../types/damage';
import { elementValues } from '../../types/elements';
import { handType, weaponCategory, weaponType } from '../../types/equipment';
import { credit } from '../../types/inventory';
import { patent } from '../../types/patent';
import { weaponRange } from '../../types/range';
import { trainingLevels } from '../../types/skills';

export function formatDamageType(damage: string) {
  let index = -1;
  index = damageTypes.findIndex((damageType) => damageType.value === damage);

  if (index === -1) {
    return 'Desconhecido';
  }
  return damageTypes[index].label;
}

export const formatAtribute = (atribute: string) => {
  return Atributes.find((item) => item.value === atribute);
};

export const formatTrainingLevel = (trainingLevel: string) => {
  return trainingLevels.find((item) => item.value === trainingLevel);
};

export const formatPatent = (inventoryPatent: string) => {
  const index = patent.findIndex((patent) => patent.value === inventoryPatent);
  return patent[index].label;
};

export const formatCredit = (inventoryCredit: string) => {
  const index = credit.findIndex((credit) => credit.value === inventoryCredit);
  return credit[index].label;
};

export function formatElement(value: string) {
  const index = elementValues.findIndex((element) => element.value === value);

  return elementValues[index].label;
}

export function formatRange(value: string) {
  const index = weaponRange.findIndex((range) => range.value === value);

  return weaponRange[index].label;
}

export function formatWeaponDamageType(value: string) {
  const index = damageTypes.findIndex((damageType) => damageType.value === value);

  return damageTypes[index].label;
}

export function formatWeaponType(value: string) {
  const index = weaponType.findIndex((damageType) => damageType.value === value);

  return weaponType[index].label;
}

export function formatWeaponHandType(value: string) {
  const index = handType.findIndex((damageType) => damageType.value === value);

  return handType[index].label;
}

export function formatWeaponCategory(value: string) {
  const index = weaponCategory.findIndex((damageType) => damageType.value === value);

  return weaponCategory[index].label;
}
