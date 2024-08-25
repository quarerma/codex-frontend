import axios from 'axios';
import Cookies from 'js-cookie';
import { CreateCampaignSchema } from '../../schemas/create.campaign';
import { Campaign } from '../../types/campaign';

const API_URL = process.env.API_URL;
export async function getUserCampaigns(): Promise<Campaign[]> {
  try {
    const jwt = Cookies.get('jwt');
    const response = await axios.get(`${API_URL}user/campaigns`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function createCampaign(data: CreateCampaignSchema): Promise<Campaign> {
  try {
    const jwt = Cookies.get('jwt');
    const response = await axios.post(`${API_URL}campaigns/create`, data, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}