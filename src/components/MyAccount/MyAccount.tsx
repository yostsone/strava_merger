import { useEffect, useState } from 'react';
import { useLocation, NavLink } from 'react-router';
import { AxiosResponse } from 'axios';
import { Profile } from './MyAccountType'
import { getUserData } from './MyAccountApi';
import MyAccountInfo from '../MyAccountInfo/MyAccountInfo';
import Loader from '../Loader/Loader';
import { getProfileData, getUserLoginData, useProfileStore } from '../../utils/User';
import { deleteStorageData } from '../../utils/BrowserDatabase';
import { USER_LOGIN, AUTH_CODE } from '../../constants';

export default function MyAccount() {
  const [profileData, setProfileData] = useState <Profile>(getProfileData);
  const [isError, setIsError ] = useState<boolean>(false);
  // because react in dev mode loads twice, but request with given code is valid only once
  const [isStrictCheck, setStrictCheck ] = useState<boolean>(false);
  let params = useLocation();

  const [, setProfile ] = useProfileStore();
  useEffect(() => {
    const userLogin = getUserLoginData();
    let paramsArray = new URLSearchParams(params.search);
    const clientId = userLogin.clientId;
    const clientSecret = userLogin.clientSecret;

    if (!profileData.accessToken) {
      getUserData(clientId, clientSecret, paramsArray.get(AUTH_CODE))
        .then((response: AxiosResponse) => {
          const {
            data: {
              access_token,
              athlete: {
                id, firstname, lastname, username, profile, created_at, bio, city, weight
              }
            }
          } = response;

          const athlete = { id, firstname, lastname, username, photo: profile, createdAt: created_at, bio, city, weight, accessToken: access_token } ;
          setProfile(JSON.stringify(athlete));
          setProfileData(athlete);
          setStrictCheck(true);
        })
        .catch(() => {
          if (!isStrictCheck) {
            setIsError(true);
          }
        })
        .finally(() => {
          deleteStorageData(USER_LOGIN);
        });
    }
  }, [isStrictCheck, params.search, profileData.accessToken, setProfile]);

  const { firstname, lastname, photo } = profileData;

  if (firstname !== '' && lastname !== '' && photo !== '') {
    return (
        <div className="flex flex-col p-10">
          <MyAccountInfo props={ profileData } />
          <div className="flex justify-between pt-10">
            <NavLink to={'/stats'} className="lowercase text-lime-900 border-lime-900 border-4 p-2 font-bold transition-colors delay-150 hover:bg-lime-100">
              Check My Stats
            </NavLink>
            <NavLink to={'/merge'} className="lowercase text-lime-900 border-lime-900 border-4 p-2 font-bold transition-colors delay-150 hover:bg-lime-100">
              Merge Activities
            </NavLink>
          </div>
        </div>
    );
  }

  if (isError && !isStrictCheck) {
    window.location.reload();
  }

  return <Loader />
}