import { useEffect, useState } from 'react';
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import getUserToken from './MyAccountApi';
import { Profile } from './MyAccountType'
import { AxiosResponse } from "axios";

/**
 * Set state value from local storage if available
 */
const initProfileData = ():Profile => {
  const customerDataValue = localStorage.getItem('customerData');

  return (customerDataValue !== null) ? JSON.parse(customerDataValue) : {
    firstname: '',
    lastname: '',
    photo: '',
    accessToken: ''
  };
};

export default function MyAccount() {
  const [profileData, setProfileData] = useState <Profile>(initProfileData);
  const [isLoading, setIsLoading ] = useState<boolean>(true);
  let params = useLocation();

  useEffect(() => {
    let paramsArray = new URLSearchParams(params.search);
    const clientId = '62468';
    const client_secret= 'f6d8f544e646f8ad2e9348c431ef81c322cb31ec';

    if (profileData.accessToken === '') {
      getUserToken(clientId, client_secret, paramsArray.get('code'))
          .then(function (response: AxiosResponse) {
            const { data: { accessToken, athlete: { firstname, lastname, profile } } } = response;
            setProfileData({ firstname, lastname, photo: profile, accessToken });
            window.localStorage.setItem('customerData', JSON.stringify({ firstname, lastname, photo: profile, accessToken }));
            setIsLoading(false);
          })
          .catch(function (error) {
            console.log(error);
          });
    }
  }, [params.search, profileData.accessToken]);

  if (isLoading && profileData.accessToken === '') {
    return <h2>🌀 Loading...</h2>;
  }

  return (
    <>
      <h3 className="text-3xl font-bold underline">Hello { profileData.firstname?? profileData.firstname } { profileData.lastname?? profileData.lastname }! This is your acccount!</h3>
      <img src={ profileData.photo ?? profileData.photo } alt="Profile"/>
      <Link to={'/stats'}>Check My Stats</Link>
    </>
  )
}
