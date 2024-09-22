import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.API_URL;

export async function updateSkillTrainingLevel(characterId: string, skillId: string, traininglevel: string) {
  try {
    const jwt = Cookies.get('jwt');
    const response = await axios.patch(
      `${API_URL}character/edit-skill-training-level/${characterId}/${skillId}/${traininglevel}`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
}
