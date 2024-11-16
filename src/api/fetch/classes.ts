import { CreateClassFeatSchema } from '../../pages/admin/classes/components/assign-class-feat';
import { CreateClassSchema } from '../../schemas/create.class';
import { ClassModel } from '../../types/class';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Feat } from '../../types/feat';
import { Subclass } from '../../types/sublass';
import { post } from '../axios';

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

export async function getInitialFeats(classId: string) {
  try {
    const jwt = Cookies.get('jwt');

    const response = await axios.get(`${API_URL}classes/initial-feats/${classId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data as Feat[];
  } catch (error) {
    throw error;
  }
}
export async function getClassSubClasses(classId: string) {
  try {
    const jwt = Cookies.get('jwt');

    const response = await axios.get(`${API_URL}classes/subclasses/${classId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data as Subclass[];
  } catch (error) {
    throw error;
  }
}
