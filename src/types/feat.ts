import { Element } from './elements';

export type Feat = {
  id: string;
  name: string;
  description: string;
  prerequisites?: string[];
  element?: Element;
  afinity?: string;
};
