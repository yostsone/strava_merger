import React from 'react';
import { NavLink } from 'react-router';
import { getProfileData } from '../../utils/User';
import { deleteStorageData } from '../../utils/BrowserDatabase/BrowserDatabase';
import { PROFILE_DATA } from '../../constants';

const logOut = ():void => {
  deleteStorageData(PROFILE_DATA);
  window.location.reload();
};

export default function Header() {
  const { username, photo } = getProfileData();

  if (!username || !photo) {
    return (
      <div className="flex justify-center bg-indigo-500 h-14">
        <NavLink to={'/'}>
          <div className="text-emerald-200 text-3xl p-2 font-bold">smerge</div>
        </NavLink>
      </div>
    );
  }

  return (
      <div className="flex justify-between bg-indigo-500 h-14">
        <div className="flex justify-start w-1/3">
          <button className="p-2" onClick={ logOut }>Log out</button>
        </div>
        <NavLink to={'/'}>
          <div className="text-emerald-200 text-3xl p-2 font-bold">smerge</div>
        </NavLink>
        <div className="flex justify-end w-1/3">
          <span className="p-4 border-transparent">{ username }</span>
          <img className="m-2 size-10 rounded-full border-4 border-indigo-500" src={ photo ?? photo } alt="Profile"/>
        </div>
      </div>
  )
}