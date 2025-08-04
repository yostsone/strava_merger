export type Profile = {
  id: number | null
  firstname: string | null
  lastname: string | null
  photo: string | undefined
  username:  string | null
  bio:  string | null
  city:  string | null
  createdAt:  string
  weight:  number | null
  accessToken: string | null
};

export type Creds = {
  clientId: string | null
  clientSecret: string | null
}