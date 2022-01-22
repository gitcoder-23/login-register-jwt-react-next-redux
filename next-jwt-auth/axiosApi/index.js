import axios from 'axios';

const apiHost = `${process.env.BASE_URL}`;

const AxiosAPI = axios.create({
  baseURL: apiHost,
});

AxiosAPI.interceptors.request.use((config) => {
  // after login
  const userData = localStorage.getItem('userLogin');
  console.log('userData', userData);
  const currentUser = JSON.parse(userData);
  console.log('currentUser', currentUser);

  config.headers.Authorization = userData ? `${currentUser.token}` : '';
  return config;
});

export { AxiosAPI as default };
