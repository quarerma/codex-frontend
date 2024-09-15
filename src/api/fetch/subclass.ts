import axios from 'axios';
import Cookies from 'js-cookie';
import { CreateSubClassSchema } from '../../schemas/create.subclass';
import { Subclass } from '../../types/sublass';
import { CreateSubClassFeatSchema } from '../../pages/admin/subclasses/components/add-feat-subclass';

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
    return response.data as Subclass[];
  } catch (error) {
    throw error;
  }
}

export async function assignFeat(data: CreateSubClassFeatSchema) {
  try {
    const jwt = Cookies.get('jwt');

    // divide level by 5
    data.levelRequired = data.levelRequired == 99 ? 20 : data.levelRequired / 5;
    const response = await axios.post(`${API_URL}rpg-subclass/assign-feat/${data.subclassId}`, data, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
