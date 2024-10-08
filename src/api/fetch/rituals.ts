import axios from 'axios';
import Cookies from 'js-cookie';
import { CreateRitualsSchema } from '../../schemas/create.rituals';
import { Ritual } from '../../types/ritual';

const API_URL = process.env.API_URL;

export async function createRitual(data: CreateRitualsSchema): Promise<Ritual> {
  try {
    const jwt = Cookies.get('jwt');

    const response = await axios.post(`${API_URL}ritual`, data, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data as Ritual;
  } catch (error) {
    throw error;
  }
}

export async function getRituals(): Promise<Ritual[]> {
  try {
    const jwt = Cookies.get('jwt');

    const response = await axios.get(`${API_URL}ritual`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    console.log(response.data);
    return response.data as Ritual[];
  } catch (error) {
    throw error;
  }
}

export async function getCampaignPossibleRituals(campaignId: string): Promise<Ritual[]> {
  try {
    const jwt = Cookies.get('jwt');

    const response = await axios.get(`${API_URL}ritual/campaign-possible-rituals/${campaignId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return response.data as Ritual[];
  } catch (error) {
    throw error;
  }
}

export async function createCampaignRitual(data: CreateRitualsSchema, campaignId: string) {
  try {
    const jwt = Cookies.get('jwt');
    const response = await axios.post(`${API_URL}campaigns/campaign-rituals/${campaignId}`, data, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getCampaignRituals(campaignId: string) {
  try {
    const jwt = Cookies.get('jwt');
    const response = await axios.get(`${API_URL}campaigns/campaign-rituals/${campaignId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return response.data as Ritual[];
  } catch (error) {
    throw error;
  }
}
