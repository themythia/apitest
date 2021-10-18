import React, { useContext } from 'react';
import { useGoogleLogin } from 'react-google-login';
import LoginContext from './Context';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

const Login = ({ toggleLogin }) => {
  const loginState = useContext(LoginContext);
  console.log('Login State: ', loginState);

  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res.profileObj);
    toggleLogin();
    alert(
      `Logged in successfully welcome ${res.profileObj.name} 😍. \n See console for full profile object.`
    );
  };

  const onFailure = (res) => {
    console.error('Login failed: res:', res);
    alert(`Failed to login. 😢`);
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId: CLIENT_ID,
    isSignedIn: true,
    accessType: 'offline',
  });

  return (
    <React.Fragment>
      {loginState === false && (
        <button onClick={signIn} className='button'>
          <span className='buttonText'>Sign in with Google</span>
        </button>
      )}
    </React.Fragment>
  );
};

export default Login;
