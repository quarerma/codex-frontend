import axios from 'axios';
import Cookies from 'js-cookie';
import { CreateCampaignSchema } from '../../schemas/create.campaign';
import { Campaign } from '../../types/campaign';

const API_URL = process.env.API_URL;
export async function getUserCampaigns(): Promise<Campaign[]> {
  try {
    // const jwt = Cookies.get('jwt');
    // const response = await axios.get(`${API_URL}user/campaigns`, {
    //   headers: {
    //     Authorization: `Bearer ${jwt}`,
    //   },
    // });
    // return response.data;

    const campaign: Campaign = {
      createdAt: new Date(),
      description:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu',
      id: 'asasasa',
      name: 'Pesadelos',
      owner: {
        id: '1SJVOSJVVW',
        username: 'Quarerma',
      },
    };

    const array: Campaign[] = [];
    array.push(campaign);

    console.log(array);
    return array;
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

    const campaign: Campaign = {
      createdAt: new Date(),
      description: 'BLABLABLA',
      id: data.campaignId,
      name: 'PESADELOS',
      owner: {
        id: '1SJVOSJVVW',
        username: 'EU',
      },
    };

    return campaign;

    // const response = await axios.post(`${API_URL}campaigns/join`, data, {
    //   headers: {
    //     Authorization: `Bearer ${jwt}`,
    //   },
    // });

    // return response.data;
  } catch (error) {
    throw error;
  }
}
