import axios from 'axios';
import { store } from '../app/store';
import { logout, setAccessToken } from '../features/auth/authSlice';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true
});

apiClient.interceptors.request.use((config) => {
  const token = store.getState().auth.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    if (error?.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        const refresh = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/refresh`, {}, {
          withCredentials: true
        });
        const newAccessToken = refresh.data?.data?.accessToken;
        if (newAccessToken) {
          store.dispatch(setAccessToken(newAccessToken));
          original.headers.Authorization = `Bearer ${newAccessToken}`;
          return apiClient(original);
        }
      } catch (refreshError) {
        store.dispatch(logout());
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
