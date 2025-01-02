import axios from 'axios';
import Cookies from 'js-cookie';
import { CreateCampaignSchema } from '../../schemas/create.campaign';
import { Campaign } from '../../types/campaign';
import { Character } from '../../types/character';

import { User } from '../../types/user';
import { get, post } from '../axios';

const API_URL = process.env.API_URL;
export async function getUserCampaigns(): Promise<Campaign[]> {
  try {
    const response = await get(`user/campaigns`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function createCampaign(data: CreateCampaignSchema): Promise<Campaign> {
  try {
    const response = await post(`${API_URL}campaigns/create`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function joinCampaign(data: { campaignId: string; password: string }): Promise<Campaign> {
  try {
    const response = await post(`${API_URL}campaigns/join`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getUserCampaignsAsPlayer(): Promise<Campaign[]> {
  try {
    const response = await get(`user/campaigns-player`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function fetchCampaign(id?: string): Promise<Campaign> {
  try {
    const response = await get(`campaigns/byId`, { id });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getCampaignCharacters(id?: string): Promise<Character[]> {
  try {
    const response = await get(`campaigns/campaign-characters`, { id });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getCampaignPlayers(id: string) {
  try {
    const response = await get(`campaigns/players`, { id });
    return response.data as { joinedAt: Date; player: User }[];
  } catch (error) {
    throw error;
  }
}
