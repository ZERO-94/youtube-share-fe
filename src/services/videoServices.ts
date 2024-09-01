import { axiosClient } from './axiosClient';

export const getVideosAPI = () => axiosClient.get('/videos');

export const shareVideoAPI = (url: string) =>
  axiosClient.post('/videos', { url });
