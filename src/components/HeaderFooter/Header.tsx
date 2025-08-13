import { Profile } from '../MyAccount/MyAccountType';
import { useProfileStore } from '../../utils/User';
import { deleteStorageData } from '../../utils/BrowserDatabase';
import { PROFILE_DATA , PROFILE_DETAILS } from '../../constants';
import HeaderLogo from './HeaderLogo';

const logOut = () => {
  window.location.href = '/';
  deleteStorageData(PROFILE_DATA);
};

export default function Header() {
  const [ profile ] = useProfileStore();
  let profileData: Profile;

  if (profile !== undefined) {
    profileData = JSON.parse(profile);
  } else {
    profileData = PROFILE_DETAILS;
  }
  const { username, photo } = profileData;
  if (username === '' || photo === '') {
    return (
      <div className="flex justify-center bg-indigo-500 h-14">
        <HeaderLogo />
      </div>
    );
  }

  return (
      <div className="flex justify-between bg-indigo-500 h-14">
        <div className="flex justify-start basis-1/3">
          <button className="p-2 text-emerald-200" onClick={ logOut }>Log out</button>
        </div>
        <HeaderLogo />
        <div className="flex justify-end basis-1/3">
          <span className="p-4 border-transparent text-emerald-200">{ username }</span>
          <img className="m-2 size-10 rounded-full border-4 border-indigo-500" src={ photo } alt="Profile"/>
        </div>
      </div>
  )
}