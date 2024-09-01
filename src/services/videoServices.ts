import { axiosClient } from './axiosClient';

export const getVideosAPI = () => axiosClient.get('/videos');

export const shareVideoAPI = (url: string) =>
  axiosClient.post('/videos', { url });

export const reactVideoAPI = (videoId: string, type: string) =>
  axiosClient.post(`/videos/${videoId}/react`, { type });

export const deleteReactionAPI = (videoId: string) =>
  axiosClient.delete(`/videos/${videoId}/react`);