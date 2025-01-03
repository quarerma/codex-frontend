import { CreateCampaignSchema } from '../../schemas/create.campaign';
import { Campaign } from '../../types/campaign';
import { Character } from '../../types/character';

import { User } from '../../types/user';
import { get, post } from '../axios';

export async function getUserCampaigns(): Promise<Campaign[]> {
  try {
    const response = await get(`user/campaigns`);

    return response;
  } catch (error) {
    throw error;
  }
}

export async function createCampaign(data: CreateCampaignSchema): Promise<Campaign> {
  try {
    const response = await post(`campaigns/create`, data);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function joinCampaign(data: { campaignId: string; password: string }): Promise<Campaign> {
  try {
    const response = await post(`campaigns/join`, data);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getUserCampaignsAsPlayer(): Promise<Campaign[]> {
  try {
    const response = await get(`user/campaigns-player`);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function fetchCampaign(id?: string): Promise<Campaign> {
  try {
    const params = new URLSearchParams({ id });
    const response = await get(`campaigns/byId`, { params });

    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function getCampaignCharacters(id?: string): Promise<Character[]> {
  try {
    const params = new URLSearchParams({ id });
    const response = await get(`campaigns/characters`, { params });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getCampaignPlayers(id: string) {
  try {
    const params = new URLSearchParams({ id });
    const response = await get(`campaigns/players`, { params });
    return response as { joinedAt: Date; player: User }[];
  } catch (error) {
    throw error;
  }
}
