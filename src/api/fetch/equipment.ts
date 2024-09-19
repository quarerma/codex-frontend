import axios from 'axios';
import Cookies from 'js-cookie';
import { CreateEquimentSchema } from '../../schemas/create.equipment';

const API_URL = process.env.API_URL;
export async function getPossibleCampaignEquipment(campaignId: string) {
  try {
    const jwt = Cookies.get('jwt');

    const response = await axios.get(`${API_URL}equipment/campaign-items/${campaignId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function createEquipment(data: CreateEquimentSchema) {
  try {
    const jwt = Cookies.get('jwt');

    const response = await axios.post(`${API_URL}equipment`, data, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
