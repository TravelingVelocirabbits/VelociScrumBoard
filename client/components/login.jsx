import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import LoginButton from './googleLogin';
import { gapi } from 'gapi-script';
import Logout from './googleLogout';


const Login = () => {

  const navigate = useNavigate();

  const handleSubmitSignUp = (e) => {
    e.preventDefault();

    const { username, password } = e.target;

    fetch('/route/signup', {
      method: 'POST',
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.username) {
          navigate('./board');
        } else {
          alert(`Sign up failed. Error found: ${data}`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const handleSubmitLogIn = (e) => {
    e.preventDefault();

    const { username, password } = e.target;

    fetch('/route/login', {
      method: 'POST',
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.username) {
          navigate('./board');
        } else {
          alert('Log in failed. Incorrect username or password.');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const clientId = '948098633686-g77e2in5neddfjmek6ahemvovndr45a2.apps.googleusercontent.com';
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: ''
      });
    }
    gapi.load('client:auth2', start);
  });

  return (
    <div className='loginpage'>
      <h1>Task Manager</h1> <br />
      <h4>Please log in</h4>
      <form onSubmit = {handleSubmitLogIn}>
        <input required id='username' name='username' type='text' placeholder='username'></input><br />
        <input required id='password' name='password' type='password' placeholder='password'></input><br />
        <button className='loginButton' type='submit' value='log in'> Log In</button><br />
      </form><br/><br/>
      <h4 className='loginHeader'>Sign Up</h4>
      <form onSubmit = {handleSubmitSignUp}>
        <input required name='username' type='text' placeholder='username'></input><br />
        <input required name='password' type='password' placeholder='password'></input><br />
        <button className='loginButton' type='submit' value='sign up'> Sign Up </button> <br />
      </form>
      <div className='googleButtons'> 
        <LoginButton/>
      </div>
    </div>
  );
};

export default Login;
