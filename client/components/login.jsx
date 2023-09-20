import React from 'react';

import { useNavigate, Link } from 'react-router-dom';


const Login = () => {

  return (
    <div className='loginpage'>
      <h3>Please log in</h3>
      <form method='POST' action='/route/login'>
        <input required id='username' name='username' type='text' placeholder='username'></input><br />
        <input id='password' name='password' type='password' placeholder='password'></input><br />
        <button className='loginButton' type='submit' value='log in'> Log In</button><br />
      </form>
      <h3 className='loginHeader'>Sign Up</h3>
      <form method='POST' action='/route/signup'>
        <input name='username' type='text' placeholder='username'></input><br />
        <input name='password' type='password' placeholder='password'></input><br />
        <button className='loginButton' type='submit' value='sign up'> Sign Up </button> <br />
      </form>
      <Link to='/board'>
        <button value='board'></button>
      </Link>
    </div>
  );
};

export default Login;
