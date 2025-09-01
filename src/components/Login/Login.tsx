import { useState } from 'react';
import { USER_LOGIN } from '../../constants';
import Loader from '../Loader/Loader';
const CLIENT_ID = 'clientId';
const CLIENT_SECRET = 'clientSecret';

/**
 * Handles customer ID and secret token values, if user Id is correct allows to log in.
 * Both values are saved in local storage until the access token is retrieved.
 * If user secret is incorrect, that is handled in my account page.
 */
export default function Login() {
  const [isLoading, setIsLoading] =useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  /**
   * Gets user client_id and client_secret, redirects to Strava authorization page and returns url with code.
   */
  const handleProfileData = (formData:FormData): void =>  {
    setIsLoading(true);
    setErrorMessage('');
    const currentUrl = window.location.href;
    let clientId: FormDataEntryValue | null = formData.get(CLIENT_ID);
    let clientSecret: FormDataEntryValue | null = formData.get(CLIENT_SECRET);
    const url = `/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${currentUrl}&approval_prompt=force&scope=activity:read_all,activity:write,profile:read_all`
    const redirectUrl = (currentUrl.includes('localhost') ? url : `https://www.strava.com${url}`)
    /**
     * Error handling to check whether the user ID is correct. And with most probably it will be correct if functionality
     * below throws an error, because it means that the redirect is successful. Other cases are covered under specific
     * status codes.
     */
    fetch(redirectUrl)
        .then((response:Response) => {
          const { status } = response;

          if (status === 400) {
            setErrorMessage('Please use correct user ID!');
          }

          if (status === 404) {
            setErrorMessage('There is an issue with login link, please try again later!');
          }
        })
        .catch((error) => {
          window.localStorage.setItem(USER_LOGIN, JSON.stringify({ clientId, clientSecret }));
          window.location.href = `https://www.strava.com${url}`;
        })
        .finally(() => {
          setIsLoading(false);
        });
  };

  return (
      <div className="flex flex-col p-5 lg:p-10 lg:m-10 xl:m-20 bg-gradient-to-r from-amber-100 to-lime-100 relative">
        <div className="flex justify-center">
          <h1>Enter Strava details</h1>
        </div>
        <Loader isLoading={isLoading} />
        <div className="flex justify-center">
          <form className="flex flex-col xl:w-2/3" action={ handleProfileData }>
            <div className="flex justify-between py-5">
              <label className="py-1.5 pr-3" htmlFor={ CLIENT_ID }>client ID:</label>
              <input
                  required
                  type="text"
                  name={ CLIENT_ID }
                  placeholder="client ID"
              />
            </div>
            <div className="flex justify-between py-5">
              <label className="py-1.5 pr-3" htmlFor={ CLIENT_SECRET }>client secret:</label>
              <input
                  required
                  type="password"
                  name={ CLIENT_SECRET }
                  placeholder="client secret"
              />
            </div>
            <button type="submit" className="lowercase text-lime-900 border-lime-900 border-4 p-2 mb-2 font-bold transition-colors delay-150 hover:bg-amber-100">
              Load My Profile
            </button>
            <span className="font-bold text-red-500 text-center absolute left-1/2 transform -translate-x-1/2 bottom-3">
              { errorMessage }
            </span>
          </form>
        </div>
      </div>
  )
}