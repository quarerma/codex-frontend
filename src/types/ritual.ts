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
  range: Range;
  target: string;
  duration: string;
  element: Element;
  resistence: string;

  is_custom: boolean;
  conditions: string[];

  type: string;

  normalCastDamageType?: string;
  discentCastDamageType?: string;
  trueCastDamageType?: string;

  normalCastDamage?: String;
  discentCastDamage?: String;
  trueCastDamage?: String;
};
