import { CreateSubClassSchema } from '../../schemas/create.subclass';
import { Subclass } from '../../types/sublass';
import { CreateSubClassFeatSchema } from '../../pages/admin/subclasses/components/add-feat-subclass';
import { get, post } from '../axios';

export async function createSubclass(data: CreateSubClassSchema) {
  try {
    return await post('rpg-subclass', data);
  } catch (error) {
    throw error;
  }
}
export async function getSubclasses() {
  try {
    return (await get('rpg-subclass')) as Subclass[];
  } catch (error) {
    throw error;
  }
}

export async function assignFeat(data: CreateSubClassFeatSchema) {
  try {
    // divide level by 5
    data.levelRequired = data.levelRequired == 99 ? 20 : data.levelRequired / 5;

    const params = new URLSearchParams();
    params.append('subclassId', data.subclassId);

    return await post('rpg-subclass/assign-feat', data, { params });
  } catch (error) {
    throw error;
  }
}
