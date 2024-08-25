import { CreateClassSchema } from '../../schemas/create.class';
import { ClassModel } from '../../types/class';
import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.API_URL;

export async function createClass(data: CreateClassSchema, proficiencies: string[]): Promise<ClassModel> {
  try {
    const jwt = Cookies.get('jwt');

    const classData = {
      ...data,
      proficiencies,
    };
    const response = await axios.post(`${API_URL}classes`, classData, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data as ClassModel;
  } catch (error) {
    throw error;
  }
}
