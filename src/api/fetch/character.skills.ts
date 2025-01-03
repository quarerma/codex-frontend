import { patch } from '../axios';

export async function updateSkillTrainingLevel(characterId: string, skillId: string, traininglevel: string) {
  try {
    const params = new URLSearchParams();

    params.append('characterId', characterId);
    params.append('skillId', skillId);
    params.append('traininglevel', traininglevel);

    return await patch(`character/edit-skill-training-level`, {}, { params });
  } catch (error) {
    throw error;
  }
}
