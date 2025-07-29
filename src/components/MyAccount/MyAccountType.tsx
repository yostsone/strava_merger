export type Profile = {
  firstname: string | null
  lastname: string | null
  photo: string | undefined,
  accessToken: string | null
};

export type Creds = {
  clientId: string | null
  clientSecret: string | null
}