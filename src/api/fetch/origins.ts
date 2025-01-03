import axios from 'axios';

import { CreateOriginSchema } from '../../schemas/create.origin';
import { Origin } from '../../types/origin';
import { get, post } from '../axios';

export async function createOrigin(data: CreateOriginSchema) {
  try {
    return (await post(`origins`, data)) as Origin;
  } catch (error) {
    throw error;
  }
}

export async function getOrigins() {
  try {
    const res = (await get(`origins`)) as Origin[];
    console.log(res);

    return res;
  } catch (error) {
    throw error;
  }
}
