import { CreateClassSchema } from '../../schemas/create.class';
import { ClassModel } from '../../types/class';
import { Feat } from '../../types/feat';
import { Subclass } from '../../types/sublass';
import { get, post } from '../axios';

export async function createClass(data: CreateClassSchema, proficiencies: string[]): Promise<ClassModel> {
  try {
    const classData = {
      ...data,
      proficiencies,
    };

    return post('classes', classData);
  } catch (error) {
    throw error;
  }
}

export async function getInitialFeats(classId: string) {
  try {
    const params = new URLSearchParams();
    params.append('classId', classId);

    return (await get('classes/initial-feats', { params })) as Feat[];
  } catch (error) {
    throw error;
  }
}
export async function getClassSubClasses(classId: string) {
  try {
    const params = new URLSearchParams();
    params.append('classId', classId);

    return (await get('classes/subclasses', { params })) as Subclass[];
  } catch (error) {
    throw error;
  }
}
