import axios, { isAxiosError } from 'axios';
import { RESET } from 'jotai/utils';

const api = axios.create({
    baseURL: "http://rnndj-110-138-96-64.a.free.pinggy.link/api/",
    headers: {
        'Accept' : 'application/json'
    }
});

export const handleApiError = (err: unknown): never => {
  if (isAxiosError(err)) {
    if (err.response && err.response.status) {
      const message = err.response.data?.message || 'Terjadi kesalahan. Coba ulangi lagi!';
      if (err.response.status === 401 && message === 'Unauthenticated.') {
        console.error('Unauthorized:', message);
        removeAuthToken()
        throw new Error('Sesi Anda telah berakhir. Silakan login kembali.');
      }
      console.error('API Error:', message);
      throw new Error(message);
    } else if (err.code === 'ERR_NETWORK') {
      console.error('Network Error:', err.message);
      throw new Error('Tidak dapat terhubung ke server. Periksa koneksi Anda.');
    }
  }
  console.error('Unexpected Error:', err);
  throw new Error('Terjadi kesalahan yang tidak diketahui!');
};

export const handleLogoutApiError = (err: unknown, setSession): never => {
  if (isAxiosError(err)) {
    if (err.response && err.response.status) {
      const message = err.response.data?.message || 'Terjadi kesalahan. Coba ulangi lagi!';
      if (err.response.status === 401 && message === 'Unauthenticated.') {
        console.error('Unauthorized:', message);
        removeAuthToken()
        setSession(RESET)
        throw new Error('Sesi Anda telah berakhir. Silakan login kembali.');
      }
      console.error('API Error:', message);
      throw new Error(message);
    } else if (err.code === 'ERR_NETWORK') {
      console.error('Network Error:', err.message);
      throw new Error('Tidak dapat terhubung ke server. Periksa koneksi Anda.');
    }
  }
  console.error('Unexpected Error:', err);
  throw new Error('Terjadi kesalahan yang tidak diketahui!');
};

// Function to set the Authorization header
export const setAuthToken = (token:  string | null) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

export const removeAuthToken = () => {
    delete api.defaults.headers.common['Authorization'];
};

export default api;