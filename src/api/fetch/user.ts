import { User } from '../../types/user';

import { get } from '../axios';

export async function getUserById() {
  try {
    return (await get('user')) as User;
  } catch (error) {
    throw error;
  }
}

export async function getAllUsers() {
  try {
    return (await get('user/all')) as User[];
  } catch (error) {
    throw error;
  }
}
