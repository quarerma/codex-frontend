import axios from 'axios';
import Cookies from 'js-cookie';
import { CreateSkillSchema } from '../../schemas/create.skill';
import { Skills } from '../../types/skills';

const API_URL = process.env.API_URL;

export async function createSkill(data: CreateSkillSchema): Promise<Skills> {
  try {
    const jwt = Cookies.get('jwt');

    const response = await axios.post(`${API_URL}skill`, data, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
export async function getSkills(): Promise<Skills[]> {
  try {
    const jwt = Cookies.get('jwt');

    const response = await axios.get(`${API_URL}skill`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function createCampaignSkill(data: CreateSkillSchema, campaignId: string) {
  try {
    const jwt = Cookies.get('jwt');
    const response = await axios.post(`${API_URL}campaigns/campaign-skills/${campaignId}`, data, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getCampaignSkills(campaignId: string) {
  try {
    const jwt = Cookies.get('jwt');
    const response = await axios.get(`${API_URL}campaigns/campaign-skills/${campaignId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return response.data.customSkills as Skills[];
  } catch (error) {
    throw error;
  }
}

export async function getSkillByName(name: string): Promise<Skills> {
  try {
    const jwt = Cookies.get('jwt');

    const response = await axios.get(`${API_URL}skill/byName`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      params: {
        name: name,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}
