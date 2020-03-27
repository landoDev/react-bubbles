import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { axiosWithAuth } from '../utils/axiosWithAuth'


const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [credentials, setCredentials] = useState({
    username: 'Lambda School',
    password: 'i<3Lambd4'
  })
  const [loggingIn, setLoggingIn] = useState(false);
  const history = useHistory();
  
  const handleChanges = e =>{
    e.preventDefault();
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }
  const handleLogin = e =>{
    e.preventDefault();
    // AXIOS POST WASNT LISTENING TO AXIOSWITHAUTH ASK WHY VERY CONFUSING
    axiosWithAuth()
    .post('/api/login', credentials)
    .then(res=>{
      setLoggingIn(true);
      localStorage.setItem('token', JSON.stringify(res.data.payload));
      setLoggingIn(false);
      history.push('/bubble-page')
    })
    .catch(err=>{
      console.log('Feels bad man', err);
      setLoggingIn(false);
      setCredentials({
        ...credentials,
        password: ''
      })
    })
  }


  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
        <form onSubmit={handleLogin}>
        <label>Username</label>
        <input name='username' onChange={handleChanges}></input>
        <label>Password</label>
        <input type='password' name='password' onChange={handleChanges}></input>
        <button type='submit'>Login</button>
    </form>
    </>
  );
};

export default Login;
