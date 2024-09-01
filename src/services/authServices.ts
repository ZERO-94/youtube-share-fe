import axios from 'axios';
import { axiosClient } from './axiosClient';

export const loginAPI = (data: { username: string; password: string }) =>
  axios.post('/auth/login', data, {
    headers: {
      'Content-Type': 'application/json',
    },
    baseURL: import.meta.env.VITE_BACKEND_ENDPOINT,
  });

export const getProfileAPI = (jwt?: string) =>
  !jwt
    ? axiosClient.get('/auth/profile')
    : axiosClient.get('/auth/profile', {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
