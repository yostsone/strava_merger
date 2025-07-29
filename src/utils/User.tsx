import { Creds, Profile } from '../components/MyAccount/MyAccountType';
import  { USER_LOGIN, PROFILE_DATA }  from '../constants';

/**
 * Get value from local storage if available
 */
export function getProfileData():Profile {
  const profileData = window.localStorage.getItem(PROFILE_DATA);

  return (profileData !== null) ? JSON.parse(profileData) : {
    firstname:  null,
    lastname: null,
    photo: undefined,
    accessToken: null
  };
};

/**
 * Get login details from local storage
 */
export function getUserLoginData():Creds {
  const userLogin = window.localStorage.getItem(USER_LOGIN);

  return (userLogin !== null) ? JSON.parse(userLogin) : {
    clientId: null,
    clientSecret: null
  };
};