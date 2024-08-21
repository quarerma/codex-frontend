import axios from 'axios';
import { SignUpSchema } from '../../schemas/signup.schema';

const API_URL = process.env.API_URL;
export async function signUp(data: SignUpSchema) {
  try {
    const createData = {
      username: data.username,
      email: data.email,
      password: data.password,
    };

    const response = axios.post(`${API_URL}user/create`, createData);

    return response;
  } catch (error) {
    throw error;
  }
}
