import axios from 'axios';
import Cookies from 'js-cookie';
import { CreateCharacterSchema } from '../../schemas/create.character';
import { Character } from '../../types/character';

const API_URL = process.env.API_URL;
export async function deleteCharacter(characterId: string) {
  try {
    const jwt = Cookies.get('jwt');
    const response = await axios.delete(`${API_URL}character/${characterId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}
export async function getCharacter(characterId?: string) {
  try {
    const jwt = Cookies.get('jwt');
    const response = await axios.get(`${API_URL}character/${characterId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    console.log(response.data as Character);
    return response.data as Character;
  } catch (error) {
    throw error;
  }
}

export async function getUserCharacter() {
  try {
    const jwt = Cookies.get('jwt');
    const response = await axios.get(`${API_URL}user/characters`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data as Character[];
  } catch (error) {
    throw error;
  }
}

export async function createCharacter(data: CreateCharacterSchema) {
  try {
    const jwt = Cookies.get('jwt');
    data.level = data.level == 99 ? 20 : data.level / 5;
    const response = await axios.post(`${API_URL}character/create`, data, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updateCurrentStat(characterId: string, value: number, stat: string) {
  try {
    const jwt = Cookies.get('jwt');
    const response = await axios.patch(`${API_URL}character/update-stat/${characterId}/${stat}/${value}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}
