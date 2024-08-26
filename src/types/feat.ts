import { CharacterUpgrade, Element } from '../schemas/create.feat';

export type Feat = {
  id: string;
  name: string;
  description: string;
  prerequisites?: string[];
  element?: Element;
  afinity?: string;
};
