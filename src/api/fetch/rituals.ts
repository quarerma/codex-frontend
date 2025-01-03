import { CreateRitualsSchema } from '../../schemas/create.rituals';
import { Ritual } from '../../types/ritual';
import { get, post } from '../axios';

export async function createRitual(data: CreateRitualsSchema): Promise<Ritual> {
  try {
    return (await post('ritual', data)) as Ritual;
  } catch (error) {
    throw error;
  }
}

export async function getRituals(): Promise<Ritual[]> {
  try {
    return (await get('ritual')) as Ritual[];
  } catch (error) {
    throw error;
  }
}

export async function getCampaignPossibleRituals(campaignId: string): Promise<Ritual[]> {
  try {
    const params = new URLSearchParams({ id: campaignId });
    return (await get(`ritual/campaign-possible-rituals`, { params })) as Ritual[];
  } catch (error) {
    throw error;
  }
}

export async function createCampaignRitual(data: CreateRitualsSchema, campaignId: string) {
  try {
    const params = new URLSearchParams({ id: campaignId });

    return await post('campaigns/rituals', data, { params });
  } catch (error) {
    throw error;
  }
}

export async function getCampaignRituals(campaignId: string) {
  try {
    const params = new URLSearchParams({ id: campaignId });

    return await get('campaigns/rituals', { params });
  } catch (error) {
    throw error;
  }
}
