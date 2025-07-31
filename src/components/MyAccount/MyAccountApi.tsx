import axios from 'axios';

/**
 * Gets users token and athlete data from Strava
 * Note: this request will be valid only once with every code
 *
 * @param clientId: string | null
 * @param clientSecret string | null
 * @param code string | null
 */
export function getUserData(clientId: string | null, clientSecret: string | null, code: string | null) {
  return axios.post('https://www.strava.com/oauth/token', {
    client_id: clientId,
    client_secret: clientSecret,
    code
  });
}