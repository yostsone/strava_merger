export type Profile = {
  id: number
  firstname: string
  lastname: string
  photo: string
  username:  string
  bio:  string
  city:  string
  createdAt:  string
  weight:  number
  accessToken: string
};

export type Creds = {
  clientId: string | null
  clientSecret: string | null
}