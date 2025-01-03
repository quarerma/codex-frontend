import { CreateEquimentSchema } from '../../schemas/create.equipment';
import { get, post } from '../axios';

export async function getPossibleCampaignEquipment(campaignId: string) {
  try {
    const params = new URLSearchParams();

    params.append('campaignId', campaignId);

    return await get('equipment/campaign-items', { params });
  } catch (error) {
    throw error;
  }
}

export async function createEquipment(data: CreateEquimentSchema) {
  try {
    return await post('equipment', data);
  } catch (error) {
    throw error;
  }
}

export async function createCampaignEquipment(data: CreateEquimentSchema, campaignId: string) {
  try {
    const params = new URLSearchParams();

    params.append('id', campaignId);

    return await post('campaigns/equips', data, { params });
  } catch (error) {
    throw error;
  }
}
export async function getCampaignEquipment(campaignId: string) {
  try {
    const params = new URLSearchParams();

    params.append('id', campaignId);

    return await get('campaigns/equips', { params });
  } catch (error) {
    throw error;
  }
}
