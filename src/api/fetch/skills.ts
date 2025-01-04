import { CreateSkillSchema } from '../../schemas/create.skill';
import { Skills } from '../../types/skills';
import { get, post } from '../axios';

export async function createSkill(data: CreateSkillSchema): Promise<Skills> {
  try {
    return (await post('skill', data)) as Skills;
  } catch (error) {
    throw error;
  }
}
export async function getSkills(): Promise<Skills[]> {
  try {
    return (await get('skill')) as Skills[];
  } catch (error) {
    throw error;
  }
}

export async function createCampaignSkill(data: CreateSkillSchema, campaignId: string) {
  try {
    const params = new URLSearchParams({ id: campaignId });

    return await post('campaigns/skills', data, { params });
  } catch (error) {
    throw error;
  }
}

export async function getCampaignSkills(campaignId: string) {
  try {
    const params = new URLSearchParams({ id: campaignId });

    return (await get('campaigns/skills', { params })).customSkills as Skills[];
  } catch (error) {
    throw error;
  }
}

export async function getSkillByName(name: string): Promise<Skills> {
  try {
    const params = new URLSearchParams({ name: name });

    return (await get('skill/byName', { params })) as Skills;
  } catch (error) {
    throw error;
  }
}
