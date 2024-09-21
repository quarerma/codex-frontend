import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.API_URL;

export async function assignCharacterFeat(characterId: string, featId: string) {
  try {
    const jwt = Cookies.get('jwt');
    const response = await axios.post(`${API_URL}character/assign-feat/${characterId}/${featId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function removeCharacterFeat(characterId: string, featId: string) {
  try {
    const jwt = Cookies.get('jwt');
    const response = await axios.delete(`${API_URL}character/remove-feat/${characterId}/${featId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function useFeatAffinity(characterId: string, featId: string) {
  try {
    const jwt = Cookies.get('jwt');
    const response = await axios.patch(`${API_URL}character/use-affinity/${characterId}/${featId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function unUseFeatAffinity(characterId: string, featId: string) {
  try {
    const jwt = Cookies.get('jwt');
    const response = await axios.patch(`${API_URL}character/un-use-affinity/${characterId}/${featId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}
