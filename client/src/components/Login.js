import React, { useState } from 'react'
import { useHistory ,useRouteMatch} from 'react-router-dom'
import { axiosWithAuth } from '../utils/axiosWithAuth'


const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  // console.log('Login props: ',props)
  const [user, setUser] = useState({
    username: '',
    password: ''
  })
  const [loggingIn, setLoggingIn] = useState(false);
  // HISTORY HOOK IS BROKEN IN CODE SANDBOX FOR SOME REASON
  //LOOKS LIKE PROJECT USES PROPS TO PASS IT DOWN
  const history = useHistory();
  
  const handleChanges = e =>{
    e.preventDefault();
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }
  const handleLogin = e =>{
    e.preventDefault();
    // AXIOS POST WASNT LISTENING TO AXIOSWITHAUTH ASK WHY VERY CONFUSING
    axiosWithAuth()
    .post('http://localhost:5000/api/login', user)
    .then(res=>{
      console.log('response in login POST:', res);
      setLoggingIn(true);
      localStorage.setItem('token', JSON.stringify(res.data.payload));
      setLoggingIn(false);
      // props.history.push('/bubbles-page')
      // HISTORY HOOK OPTION
      history.push('/bubble-page')
    })
    .catch(err=>{
      console.log('Feels bad man', err);
      setLoggingIn(false);
      setUser({
        ...user,
        password: ''
      })
    })
  }
  console.log('checking handle changes', user)
  console.log('logging state progression', loggingIn)

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
