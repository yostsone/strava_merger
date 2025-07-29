import React from 'react';

function GetAccount() {
  window.localStorage.removeItem('customerData');
  const getProfileData = (formData:any): void =>  {
    let clientId: string = formData.get('clientId');
    let clientSecret: string = formData.get('clientSecret');
    window.localStorage.setItem('userLogin', JSON.stringify({ clientId, clientSecret }));
    // @ts-ignore
    window.location = `http://www.strava.com/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=http://localhost:3000/&approval_prompt=force&scope=read`;
  };

  return (
      <div className="flex flex-col p-20">
        <div className="flex justify-center">
          <h1>Enter Strava details</h1>
        </div>
        <div className="flex justify-center m-5">
          <form className="w-1/2 flex flex-col" action={ getProfileData }>
            <div className="flex justify-between py-5">
              <label htmlFor="clientId">client ID:</label>
              <input
                  type="text"
                  name="clientId"
                  placeholder="client ID"
              />
            </div>
            <div className="flex justify-between py-5">
              <label htmlFor="clientSecret">client secret:</label>
              <input
                  type="password"
                  name="clientSecret"
                  placeholder="client secret"
              />
            </div>
            <button type="submit">Load My Profile</button>
          </form>
        </div>
      </div>
  )
}

export default GetAccount;