import { ClassModel } from './class';
import { Feat } from './feat';

export type Subclass = {
  id: string;
  name: string;
  description: string;
  class: ClassModel;
  subclassFeats: {
    levelRequired: number;
    feat: Feat;
  }[];
};
