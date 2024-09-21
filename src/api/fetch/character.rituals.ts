import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.API_URL;

export async function assignCharacterRitual(characterId: string, ritualId: string) {
  try {
    const jwt = Cookies.get('jwt');
    const response = await axios.post(`${API_URL}character/assign-ritual/${characterId}/${ritualId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function removeCharacterRitual(characterId: string, ritualId: string) {
  try {
    const jwt = Cookies.get('jwt');
    const response = await axios.delete(`${API_URL}character/remove-ritual/${characterId}/${ritualId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}
