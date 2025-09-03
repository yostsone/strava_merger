import axios from 'axios';
import { getUserApiData } from '../../utils/User';

const { accessToken } = getUserApiData();

/**
 * Posts new activity to Strava
 *
 * @param formData
 */
export function postActivity(formData: FormData) {
  return axios.post('https://www.strava.com/api/v3/uploads', formData, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
}

/**
 * Validates activity upload status
 * @param id
 */
export async function validateActivity(id: number) {
  return axios.get(`https://www.strava.com/api/v3/uploads/${id}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
}