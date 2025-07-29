import React from 'react';
import { getProfileData } from '../../utils/User';
import { deleteStorageData } from '../../utils/BrowserDatabase/BrowserDatabase';
import { PROFILE_DATA } from '../../constants';

const logOut = ():void => {
  deleteStorageData(PROFILE_DATA);
  window.location.reload();
};

export default function Header() {
  const { firstname, photo } = getProfileData();

  if (!firstname || !photo) {
    return (
      <div className="flex justify-between bg-indigo-400 h-14">
        <div className="text-emerald-300 text-2xl leading-10 font-bold">This is Smerge</div>
      </div>
    );
  }

  return (
      <div className="flex justify-between bg-indigo-400 h-14">
        <div className="flex justify-start">
          <button onClick={ logOut }>Log out</button>
        </div>
        <div className="text-emerald-300 text-2xl leading-10 font-bold">This is Smerge</div>
        <div className="flex justify-end">
          <span className="p-4 border-transparent">{ firstname }</span>
          <img className="m-2 size-10 rounded-full border-4 border-indigo-500" src={ photo ?? photo } alt="Profile"/>
        </div>
      </div>
  )
}