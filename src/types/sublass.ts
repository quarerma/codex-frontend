import { ClassModel } from './class';

export type Subclass = {
  id: string;
  name: string;
  description: string;
  class: ClassModel;
};
