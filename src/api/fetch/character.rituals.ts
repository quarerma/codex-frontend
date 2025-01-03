import { axios_delete, post } from '../axios';

export async function assignCharacterRitual(characterId: string, ritualId: string) {
  try {
    const params = new URLSearchParams();
    params.append('characterId', characterId);
    params.append('ritualId', ritualId);

    return await post('character/assign-ritual', { params });
  } catch (error) {
    throw error;
  }
}

export async function removeCharacterRitual(characterId: string, ritualId: string) {
  try {
    const params = new URLSearchParams();
    params.append('characterId', characterId);
    params.append('ritualId', ritualId);

    return await axios_delete('character/remove-ritual', { params });
  } catch (error) {
    throw error;
  }
}
