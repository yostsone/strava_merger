import { useSyncExternalStore } from 'react';
import { Creds, Profile } from '../components/MyAccount/MyAccountType';
import { getStorageData, setStorageData } from './BrowserDatabase';
import { USER_LOGIN, PROFILE_DATA, PROFILE_DETAILS, STORAGE } from '../constants';

const getProfileFromLocalStorage = (): string => {
  const profileData = localStorage.getItem(PROFILE_DATA) || '';

  if (profileData !== '') {
    return profileData;
  }

  return '';
}

const subscribe = (callback: () => void): (() => void) => {
  window.addEventListener(STORAGE, callback);
  return () => {
    window.removeEventListener(STORAGE, callback);
  };
};

/**
 * functionality to get the latest update for profile data in storage, set storage data
 */
export  function useProfileStore(): [string, (newProfile: string) => void]{
  const profile = useSyncExternalStore(subscribe, getProfileFromLocalStorage);

  const setProfile = (newProfile: string) => {

    setStorageData(PROFILE_DATA, JSON.parse(newProfile));
    window.dispatchEvent(new Event(STORAGE));
  };

  return [profile, setProfile];
}

/**
 * Get value from local storage if available
 */
export function getProfileData():Profile {
  const profileData = window.localStorage.getItem(PROFILE_DATA);

  return (profileData !== null) ? JSON.parse(profileData) : {
    firstname:  null,
    lastname: null,
    photo: undefined,
    username: null,
    bio: null,
    city: null,
    createdAt: null,
    weight: null
  };
}

/**
 * Get login details from local storage
 */
export function getUserLoginData():Creds {
  const userLogin = getStorageData<Creds>(USER_LOGIN)

  return (typeof userLogin === 'boolean' || typeof userLogin === 'string')? {
    clientId: null,
    clientSecret: null
  }: userLogin;
}

/**
 * Set initial object with empty values for profile
 */
export function setInitialUser(): void {
  const profileData = localStorage.getItem(PROFILE_DATA) || false;

  if (!profileData) {
    localStorage.setItem(PROFILE_DATA, JSON.stringify(PROFILE_DETAILS));
  }
}
