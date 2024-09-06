import { Feat } from './feat';

export type Origin = {
  id: string;
  name: string;
  description: string;
  skills: string[];
  featId: string;
  feats: Feat;
};
