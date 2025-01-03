import { ConditionsSchema } from '../../schemas/conditions';
import { Condition } from '../../types/condition';
import { get, post } from '../axios';

export async function createCondition(data: ConditionsSchema): Promise<Condition> {
  try {
    return (await post('conditions', data)) as Condition;
  } catch (error) {
    throw error;
  }
}

export async function getConditions(): Promise<Condition[]> {
  try {
    return (await get('conditions')) as Condition[];
  } catch (error) {
    throw error;
  }
}
