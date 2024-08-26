import axios from 'axios';
import Cookies from 'js-cookie';
import { CreateSubClassSchema } from '../../schemas/create.subclass';
import { Subclass } from '../../types/sublass';

const API_URL = process.env.API_URL;

export async function createSubclass(data: CreateSubClassSchema) {
  try {
    const jwt = Cookies.get('jwt');

    const response = await axios.post(`${API_URL}rpg-subclass`, data, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
export async function getSubclasses() {
  try {
    const jwt = Cookies.get('jwt');

    const response = await axios.get(`${API_URL}rpg-subclass`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    console.log(response.data);
    return response.data as Subclass[];
  } catch (error) {
    throw error;
  }
}
