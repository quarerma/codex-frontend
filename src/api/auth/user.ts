import axios from 'axios';
import { SignUpSchema } from '../../schemas/signup.schema';
import { User } from '../../types/user';
import Cookies from 'js-cookie';

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

export async function getUserById() {
  try {
    // const jwt = getCookie('jwt');
    const jwt = Cookies.get('jwt');

    const response = await axios.get(`${API_URL}user`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return response.data as User;
  } catch (error) {
    throw error;
  }
}
