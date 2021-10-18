import React from 'react';
import { useGoogleLogout } from 'react-google-login';
import LoginContext from './Context';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

function Logout({ toggleLogin }) {
  const loginState = React.useContext(LoginContext);
  console.log('Login State: ', loginState);

  const onLogoutSuccess = () => {
    toggleLogin();
    console.log('Logged out Success');
    alert('Logged out Successfully ✌');
  };

  const onFailure = () => {
    console.error('Logout failed');
  };

  const { signOut } = useGoogleLogout({
    clientId: CLIENT_ID,
    onLogoutSuccess,
    onFailure,
  });

  return (
    <React.Fragment>
      {loginState === true && (
        <button onClick={signOut} className='button'>
          <span className='buttonText'>Sign out</span>
        </button>
      )}
    </React.Fragment>
  );
}

export default Logout;
