import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';


const clientId = '948098633686-g77e2in5neddfjmek6ahemvovndr45a2.apps.googleusercontent.com';

function Login() {

  const navigate = useNavigate();

  const onSuccess = (res) => {
    console.log('Login Success', res);
    navigate('/board');
  };

  const onFailure = (err) => {
    console.log('Login Failed', err);
  };

  return (
    <div id='signInButton'>
      <GoogleLogin
        clientId={clientId}
        buttonText='Login'
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
      />
    </div>
  );
}

export default Login;