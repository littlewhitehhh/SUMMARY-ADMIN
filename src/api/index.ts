import axios from 'axios';
import md5 from 'js-md5';
const instance = axios.create({
  timeout: 2000,
  baseURL: import.meta.env.VITE_API_URL as string,
  withCredentials: true
});
export default instance;

export const test = () => {
  console.log('test');

  instance
    .post('/geeker/login', {
      username: 'admin',
      password: md5('123456')
    })
    .then(res => {
      console.log(res);
    });
};
