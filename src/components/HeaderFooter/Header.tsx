import { Profile } from '../MyAccount/MyAccountType';
import { useProfileStore } from '../../utils/User';
import { deleteStorageData } from '../../utils/BrowserDatabase';
import { PROFILE_DATA , PROFILE_DETAILS, GH_SUB_LINK } from '../../constants';
import HeaderLogo from './HeaderLogo';
import ImageLoader from "../ImageLoader/ImageLoader";

const logOut = () => {
  window.location.href = `/${GH_SUB_LINK}`;
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
      <div className="flex justify-center bg-amber-500 h-14">
        <HeaderLogo />
      </div>
    );
  }

  return (
      <div className="flex justify-between bg-amber-500 h-14">
        <div className="flex justify-start basis-1/3">
          <button className="p-2 text-amber-50" onClick={ logOut }>Log out</button>
        </div>
        <HeaderLogo />
        <div className="flex justify-end basis-1/3">
          <span className="hidden sm:inline p-4 border-transparent text-amber-50">{ username }</span>
          <ImageLoader src={ photo } alt="Profile" styles="m-2 size-10 rounded-full border-4 border-amber-50" />
        </div>
      </div>
  )
}