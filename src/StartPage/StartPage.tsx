import React from 'react';
function MyAccount() {
  window.localStorage.removeItem('customerData');
  const getProfileData = (formData:any): void =>  {
    let clientId: number = formData.get('clientId');
    // @ts-ignore
    window.location = `http://www.strava.com/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=http://localhost:3000/profile&approval_prompt=force&scope=read`;
  };

  return (
      <>
        <h3>Get My Account</h3>
        <form action={ getProfileData }>
          <label htmlFor="clientId">Your strava client ID:</label>
          <input type="text" name="clientId"/>
          <button type="submit">Get My Profile</button>
        </form>
      </>
  )
}

export default MyAccount;