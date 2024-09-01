import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_ENDPOINT as string,
  headers: {
    'Content-Type': 'application/json',
  },
});

// export const refreshAccessToken = async () => {
//   const { data: refreshResult } = await axiosClient.post<
//     Response<Omit<LoginData, 'refreshToken'>>
//   >('/api/auth/refresh_token', {
//     refreshToken: localStorage.getItem(REFRESH_TOKEN),
//   });
//   localStorage.setItem(ACCESS_TOKEN, refreshResult?.data?.accessToken || '');
//   return refreshResult?.data?.accessToken;
// };

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    // const originalConfig = error.config;
    // if (error?.response?.status === 401) {
    //   try {
    //     const access_token = await refreshAccessToken();
    //     axios.defaults.headers.common['Authorization'] =
    //       'Bearer ' + access_token;
    //     return axiosClient(originalConfig);
    //   } catch (error: any) {
    //     if (originalConfig.redirectOn401) {
    //       //if refresh token expired: redirect to login & clear local storage
    //       localStorage.removeItem(REFRESH_TOKEN);
    //       localStorage.removeItem(ACCESS_TOKEN);
    //       const urlSearchParams = new URLSearchParams(window.location.search);
    //       const redirectUrl =
    //         urlSearchParams.get('redirect') || window.location.href;
    //       window.location.href = `/auth/signin?redirect=${encodeURIComponent(
    //         redirectUrl
    //       )}`;
    //       // Add redirect action to session storage
    //       originalConfig.redirectAction &&
    //         sessionStorage.setItem(
    //           'redirectAction',
    //           originalConfig.redirectAction
    //         );
    //     }
    //     return Promise.reject(error);
    //   }
    // }

    return Promise.reject(error);
  }
);

export const setAuthorizationHeader = (token?: string) => {
  if (!token) {
    delete axiosClient.defaults.headers.common['Authorization'];
    return;
  }
  axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};
