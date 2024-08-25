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

    const response = await axios.post(`${API_URL}user/create`, createData);

    return response;
  } catch (error) {
    throw error;
  }
}

export async function login(data: { username: string; password: string }) {
  try {
    const response = await axios.post(`${API_URL}auth/auth-login`, data);

    return response;
  } catch (error) {
    throw error;
  }
}
