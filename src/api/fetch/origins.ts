import axios from 'axios';

import Cookies from 'js-cookie';
import { CreateOriginSchema } from '../../schemas/create.origin';
import { Origin } from '../../types/origin';

const API_URL = process.env.API_URL;

export async function createOrigin(data: CreateOriginSchema) {
  try {
    const jwt = Cookies.get('jwt');
    const response = await axios.post(`${API_URL}origins`, data, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data as Origin;
  } catch (error) {
    throw error;
  }
}

export async function getOrigins() {
  try {
    const jwt = Cookies.get('jwt');
    const response = await axios.get(`${API_URL}origins`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data as Origin[];
  } catch (error) {
    throw error;
  }
}
