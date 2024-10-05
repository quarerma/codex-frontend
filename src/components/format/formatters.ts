import { damageTypes } from '../../types/damage';

export function formatDamageType(damage: string) {
  const index = damageTypes.findIndex((damageType) => damageType.value === damage);

  return damageTypes[index].label;
}
