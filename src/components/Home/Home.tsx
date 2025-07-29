import MyAccount from '../MyAccount/MyAccount';
import GetAccount from '../GetAccount/GetAccount';
import { getUserLoginData, getProfileData } from '../../utils/User';
import { Creds, Profile } from "../MyAccount/MyAccountType";

export default function Home() {
  const userLoginData: Creds = getUserLoginData();
  const userProfile: Profile = getProfileData();

  if (userLoginData.clientId || userProfile.firstname) {
    return (
        <MyAccount />
    )
  }

  return (
      <GetAccount />
  );
}
