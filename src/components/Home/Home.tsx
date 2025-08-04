import { Creds, Profile } from '../MyAccount/MyAccountType';
import MyAccount from '../MyAccount/MyAccount';
import Login from '../Login/Login';
import { getUserLoginData, getProfileData } from '../../utils/User';

/**
 * Renders My account page for logged-in users and login page for others
 */
export default function Home() {
  const userLoginData: Creds = getUserLoginData();
  const userProfile: Profile = getProfileData();

  if (userLoginData.clientId || userProfile.firstname) {
    return (
        <MyAccount />
    )
  }

  return (
      <Login />
  );
}
