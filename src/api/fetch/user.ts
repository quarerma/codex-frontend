import axios from 'axios';
import { User } from '../../types/user';
import Cookies from 'js-cookie';

const API_URL = process.env.API_URL;

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

export async function getAllUsers() {
  try {
    const jwt = Cookies.get('jwt');
    const response = await axios.get(`${API_URL}user/all`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data as User[];
  } catch (error) {
    throw error;
  }
}
