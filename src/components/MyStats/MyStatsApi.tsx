import axios from 'axios';
import { getUserApiData } from '../../utils/User';

/**
 * Make API call to get current user stats
 */
export function getMyStats() {
  const { id, accessToken } = getUserApiData();

  return axios.get(`https://www.strava.com/api/v3/athletes/${id}/stats`,  {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
}