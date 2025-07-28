import axios from "axios";

export default function getUserToken(client_id: string, client_secret: string, code: string | null) {
  return axios.post('https://www.strava.com/oauth/token', {
    client_id,
    client_secret,
    code
  })
}