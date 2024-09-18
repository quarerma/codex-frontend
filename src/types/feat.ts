import { Element } from './elements';

export type Feat = {
  id: string;
  name: string;
  description: string;
  prerequisites?: string[];
  element?: Element;
  type: FeatType;
  afinity?: string;
};

export type FeatType = 'ORIGIN' | 'CLASS' | 'SUBCLASS' | 'GENERAL';
