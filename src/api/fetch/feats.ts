import { Feat } from '../../types/feat';
import { CreateFeatSchema } from '../../schemas/create.feat';
import { get, post } from '../axios';

export async function createGeneralFeat(data: CreateFeatSchema): Promise<Feat> {
  try {
    return (await post('feats/general-feat', data)) as Feat;
  } catch (error) {
    throw error;
  }
}

export async function getGeneralFeats(): Promise<Feat[]> {
  try {
    return (await get('feats/general-feat')) as Feat[];
  } catch (error) {
    throw error;
  }
}
export async function getNonCustomFeats(): Promise<Feat[]> {
  try {
    return (await get('feats/non-custom-feats')) as Feat[];
  } catch (error) {
    throw error;
  }
}

export async function getCampaignPossibleFeats(campaignID: string): Promise<Feat[]> {
  try {
    const params = new URLSearchParams();
    params.append('id', campaignID);

    return (await get('feats/campaign-possible-feats', { params })) as Feat[];
  } catch (error) {
    throw error;
  }
}

export async function getClassFeats(): Promise<Feat[]> {
  try {
    return (await get('feats/classes-feats')) as Feat[];
  } catch (error) {
    throw error;
  }
}
export async function getSubClassFeats(): Promise<Feat[]> {
  try {
    return (await get('feats/subclasses-feats')) as Feat[];
  } catch (error) {
    throw error;
  }
}

export async function getFilteresClassFeats(classId: string): Promise<Feat[]> {
  try {
    const params = new URLSearchParams();
    params.append('classId', classId);

    return (await get('feats/filter-class-feats', { params })) as Feat[];
  } catch (error) {
    throw error;
  }
}

export async function getFilteredSubClassFeats(subclassId: string): Promise<Feat[]> {
  try {
    const params = new URLSearchParams();
    params.append('subclassId', subclassId);

    return (await get('feats/filter-subclass-feats', { params })) as Feat[];
  } catch (error) {
    throw error;
  }
}

export async function createCampaignFeat(data: CreateFeatSchema, campaignId: string) {
  try {
    const params = new URLSearchParams({ id: campaignId });

    return await post('campaigns/feats', data, { params });
  } catch (error) {
    throw error;
  }
}
export async function getCampaignFeats(campaignId: string) {
  try {
    const params = new URLSearchParams({ id: campaignId });

    return await get('campaigns/feats', { params });
  } catch (error) {
    throw error;
  }
}
