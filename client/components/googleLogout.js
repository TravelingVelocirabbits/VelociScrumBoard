import { GoogleLogout } from 'react-google-login';
import { useNavigate } from 'react-router';
import React from 'react';

const clientId = '948098633686-g77e2in5neddfjmek6ahemvovndr45a2.apps.googleusercontent.com';

function Logout() {

  const navigate = useNavigate();

  const onSuccess = () => {
    console.log('Successfully logged out');
    navigate('/');
  };

  return (
    <div id='signOutButton' 
      style={{
        marginTop: '40px',
        marginLeft: '20px',
      }}>
      <GoogleLogout
        clientId={clientId}
        buttonText='Logout'
        onLogoutSuccess={onSuccess}
      />
    </div>
  );
}

export default Logout;