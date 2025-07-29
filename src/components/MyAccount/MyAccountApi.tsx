import axios from 'axios';

export default function getUserToken(clientId: string | null, clientSecret: string | null, code: string | null) {
  return axios.post('https://www.strava.com/oauth/token', {
    client_id: clientId,
    client_secret: clientSecret,
    code
  })
}