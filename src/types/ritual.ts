export type Ritual = {
  id: string;
  name: string;

  normalCastDescription: string;
  normalCost: number;

  discentCastDescription?: string;
  discentCost?: number;

  trueCastDescription?: string;
  trueCost?: number;

  ritualLevel: number;
  exectutionTime: string;
  range: string;
  target: string;
  duration: string;
  element: string;
  resistence: string;

  is_custom: boolean;
  conditions: string[];

  type: string;
  damageRitual: {
    normalCastDamageType: string;
    discentCastDamageType: string;
    trueCastDamageType: string;

    normalCastDamage: string;
    discentCastDamage: string;
    trueCastDamage: string;
  };
};
