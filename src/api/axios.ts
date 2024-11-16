import axios from 'axios';
import Cookies from 'js-cookie';

const apiUrl = process.env.API_URL;

const axiosInstance = axios.create({
  baseURL: apiUrl,
  timeout: 2000000,
});

export async function get(url: string, options = {}) {
  const jwt = Cookies.get('jwt');
  try {
    const response = await axiosInstance.get(url, {
      ...options,
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function post(url: string, data = {}, options = {}) {
  const jwt = Cookies.get('jwt');
  try {
    const response = await axiosInstance.post(url, data, {
      ...options,
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
