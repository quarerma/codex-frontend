import axios from 'axios';
import Cookies from 'js-cookie';
import { CreateCampaignSchema } from '../../schemas/create.campaign';
import { Campaign } from '../../types/campaign';
import { Character } from '../../types/character';

import { User } from '../../types/user';

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

export async function joinCampaign(data: { campaignId: string; password: string }): Promise<Campaign> {
  try {
    const jwt = Cookies.get('jwt');

    const response = await axios.post(`${API_URL}campaigns/join`, data, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getUserCampaignsAsPlayer(): Promise<Campaign[]> {
  try {
    const jwt = Cookies.get('jwt');
    const response = await axios.get(`${API_URL}user/campaigns-player`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function fetchCampaign(id?: string): Promise<Campaign> {
  try {
    const jwt = Cookies.get('jwt');
    const response = await axios.get(`${API_URL}campaigns/byId/${id}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getCampaignCharacters(id?: string): Promise<Character[]> {
  try {
    const jwt = Cookies.get('jwt');
    const response = await axios.get(`${API_URL}campaigns/campaign-characters/${id}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getCampaignPlayers(id: string) {
  try {
    const jwt = Cookies.get('jwt');
    const response = await axios.get(`${API_URL}campaigns/players/${id}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    console.log(response.data);
    return response.data as { joinedAt: Date; player: User }[];
  } catch (error) {
    throw error;
  }
}
