import axios from 'axios'

export const axiosWithAuth = () =>{
  const token = JSON.parse(localStorage.getItem('token'));
  console.log('the auth token in axiosWithAuth: ', token)
  return axios.create({
    baseUrl: 'http://localhost:5000',
    headers:{
      Autorization: token
    }
  })
}