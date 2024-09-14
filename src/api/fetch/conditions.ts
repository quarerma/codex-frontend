import axios from 'axios';
import Cookies from 'js-cookie';
import { ConditionsSchema } from '../../schemas/conditions';
import { Condition } from '../../types/condition';

const API_URL = process.env.API_URL;

export async function createCondition(data: ConditionsSchema): Promise<Condition> {
  try {
    const jwt = Cookies.get('jwt');

    const response = await axios.post(`${API_URL}conditions`, data, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data as Condition;
  } catch (error) {
    throw error;
  }
}

export async function getConditions(): Promise<Condition[]> {
  try {
    const jwt = Cookies.get('jwt');

    const response = await axios.get(`${API_URL}conditions`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data as Condition[];
  } catch (error) {
    throw error;
  }
}
