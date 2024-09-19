import axios from 'axios';
import Cookies from 'js-cookie';
import { Feat } from '../../types/feat';
import { CreateFeatSchema } from '../../schemas/create.feat';

const API_URL = process.env.API_URL;

export async function createGeneralFeat(data: CreateFeatSchema): Promise<Feat> {
  try {
    const jwt = Cookies.get('jwt');

    const response = await axios.post(`${API_URL}feats/general-feat`, data, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data as Feat;
  } catch (error) {
    throw error;
  }
}

export async function getGeneralFeats(): Promise<Feat[]> {
  try {
    const jwt = Cookies.get('jwt');

    const response = await axios.get(`${API_URL}feats/general-feat`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return response.data as Feat[];
  } catch (error) {
    throw error;
  }
}
export async function getNonCustomFeats(): Promise<Feat[]> {
  try {
    const jwt = Cookies.get('jwt');

    const response = await axios.get(`${API_URL}feats/non-custom-feats`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return response.data as Feat[];
  } catch (error) {
    throw error;
  }
}

export async function getClassFeats(): Promise<Feat[]> {
  try {
    const jwt = Cookies.get('jwt');

    const response = await axios.get(`${API_URL}feats/classes-feats`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return response.data as Feat[];
  } catch (error) {
    throw error;
  }
}
export async function getSubClassFeats(): Promise<Feat[]> {
  try {
    const jwt = Cookies.get('jwt');

    const response = await axios.get(`${API_URL}feats/subclasses-feats`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return response.data as Feat[];
  } catch (error) {
    throw error;
  }
}

export async function getFilteresClassFeats(classId: string): Promise<Feat[]> {
  try {
    const jwt = Cookies.get('jwt');

    const response = await axios.get(`${API_URL}feats/filter-class-feats/${classId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return response.data as Feat[];
  } catch (error) {
    throw error;
  }
}

export async function getFilteredSubClassFeats(subclassId: string): Promise<Feat[]> {
  try {
    const jwt = Cookies.get('jwt');

    const response = await axios.get(`${API_URL}feats/filter-subclass-feats/${subclassId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return response.data as Feat[];
  } catch (error) {
    throw error;
  }
}

export async function getCampaignFeats(campaignId: string): Promise<Feat[]> {
  try {
    const jwt = Cookies.get('jwt');

    const response = await axios.get(`${API_URL}campaigns/campaign-feats/${campaignId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    console.log(response.data);
    return response.data as Feat[];
  } catch (error) {
    throw error;
  }
}
