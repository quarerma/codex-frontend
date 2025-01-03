import { CreateCharacterSchema } from '../../schemas/create.character';
import { Character } from '../../types/character';
import { axios_delete, get, patch, post } from '../axios';

export async function deleteCharacter(characterId: string) {
  try {
    const params = new URLSearchParams({ id: characterId });

    return await axios_delete(`character`, { params });
  } catch (error) {
    throw error;
  }
}
export async function getCharacter(characterId?: string) {
  try {
    const params = new URLSearchParams({ id: characterId });

    return (await get(`character`, { params })) as Character;
  } catch (error) {
    throw error;
  }
}

export async function getUserCharacter() {
  try {
    return (await get(`user/characters`)) as Character[];
  } catch (error) {
    throw error;
  }
}

export async function createCharacter(data: CreateCharacterSchema) {
  try {
    data.level = data.level == 99 ? 20 : data.level / 5;

    return await post(`character/create`, data);
  } catch (error) {
    throw error;
  }
}

export async function updateCurrentStat(characterId: string, value: number, stat: string) {
  try {
    const params = new URLSearchParams();
    params.append('characterId', characterId);
    params.append('value', value.toString());
    params.append('stat', stat);

    return await patch(`character/update-stat`, {}, { params });
  } catch (error) {
    throw error;
  }
}
