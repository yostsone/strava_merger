import axios from 'axios';
import { getStorageData } from '../../utils/BrowserDatabase';
import { PROFILE_DATA } from '../../constants';
import { Profile } from '../MyAccount/MyAccountType';

type ApiClient = {
  id: number,
  accessToken: string
};

/**
 * Getting necessary user data to use API calls
 */
function getUserApiData(): ApiClient {
  const apiProfileInfo = getStorageData<Profile>(PROFILE_DATA);

  if (typeof apiProfileInfo === 'boolean' || typeof apiProfileInfo === 'string') {
    return { id: 0, accessToken:'' };
  }

  const { id = 0, accessToken = '' } = apiProfileInfo;

  return { id, accessToken };
}

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