import { axios_delete, patch, post } from '../axios';

export async function assignCharacterFeat(characterId: string, featId: string) {
  try {
    const params = new URLSearchParams();
    params.append('characterId', characterId);
    params.append('featId', featId);
    return await post('character/assign-feat', { params });
  } catch (error) {
    throw error;
  }
}

export async function removeCharacterFeat(characterId: string, featId: string) {
  try {
    const params = new URLSearchParams();
    params.append('characterId', characterId);
    params.append('featId', featId);

    return await axios_delete('character/remove-feat', { params });
  } catch (error) {
    throw error;
  }
}

export async function useFeatAffinity(characterId: string, featId: string) {
  try {
    const params = new URLSearchParams();
    params.append('characterId', characterId);
    params.append('featId', featId);

    return await patch('character/use-affinity', { params });
  } catch (error) {
    throw error;
  }
}

export async function unUseFeatAffinity(characterId: string, featId: string) {
  try {
    const params = new URLSearchParams();
    params.append('characterId', characterId);
    params.append('featId', featId);

    return await patch('character/un-use-affinity', {}, { params });
  } catch (error) {
    throw error;
  }
}
