const CLIENT_ID = 'clientId';
const CLIENT_SECRET = 'clientSecret';

/**
 * Gets user client_id and client_secret, redirects to Strava authorization page and returns url with code
 */
const getProfileData = (formData:any): void =>  {
  let clientId: string = formData.get(CLIENT_ID);
  let clientSecret: string = formData.get(CLIENT_SECRET);
  window.localStorage.setItem('userLogin', JSON.stringify({ clientId, clientSecret }));
  // @ts-ignore TO BE DONE
  window.location = `https://www.strava.com/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=http://localhost:3000/&approval_prompt=force&scope=activity:read_all,activity:write,profile:read_all`;
};

export default function Login() {
  return (
      <div className="flex flex-col py-10">
        <div className="flex justify-center">
          <h1>Enter Strava details</h1>
        </div>
        <div className="flex justify-center">
          <form className="flex flex-col xl:w-1/2 " action={ getProfileData }>
            <div className="flex justify-between py-5">
              <label htmlFor={ CLIENT_ID }>client ID:</label>
              <input
                  required
                  type="text"
                  name={ CLIENT_ID }
                  placeholder="client ID"
              />
            </div>
            <div className="flex justify-between py-5">
              <label htmlFor={ CLIENT_SECRET }>client secret:</label>
              <input
                  required
                  type="password"
                  name={ CLIENT_SECRET }
                  placeholder="client secret"
              />
            </div>
            <button type="submit" className="lowercase text-indigo-600 border-indigo-600 border-4 p-2 font-bold">
              Load My Profile
            </button>
          </form>
        </div>
      </div>
  )
}