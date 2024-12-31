import { isAxiosError } from 'axios';
import { useAtom, useAtomValue } from 'jotai';
import { sessionAtom } from '../atoms/authAtom';
import { Session } from '../types/Auth';
import api, { handleApiError, handleLogoutApiError, removeAuthToken, setAuthToken } from './api';
import { RESET } from 'jotai/utils';

export function useAuth() {
  const [session, setSession] = useAtom(sessionAtom);

  const user = useAtomValue(sessionAtom)?.user;
  const token = useAtomValue(sessionAtom)?.token;
  const roles = useAtomValue(sessionAtom)?.user?.roles;

  const loginCredential = async (username: string, password: string): Promise<Session | null> => {
    try {
      const response = await api.post('login-credential', {
        username,
        password,
      });

      const sessionData: Session = { token: response.data.token, user: response.data.user };

      setSession(sessionData);
      setAuthToken(response.data.token);

      return sessionData;

    } catch (err) {
      if (isAxiosError(err)) {
        if (err.response && err.response.status === 401) {
          // Handle 401 Unauthorized error from the server
          const message = err.response.data?.message;
          console.error('Login failed:', message);
          throw new Error(message);
        } else if (err.code === 'ERR_NETWORK') {
          // Handle Network Error
          console.error('Network error:', err.message);
          throw new Error('Tidak dapat terhubung ke server. Periksa koneksi Anda.');
        }
      }
      console.error('Unexpected error:', err);
      throw new Error('Terjadi kesalahan yang tidak diketahui!');
    }
  };

  const loginNfc = async (nfc: string): Promise<Session | null> => {
    try {
      const response = await api.post('login-nfc', {
        nfc,
      });

      const sessionData: Session = { token: response.data.token, user: response.data.user };

      setSession(sessionData);
      setAuthToken(response.data.token);

      return sessionData;

    } catch (err) {
      if (isAxiosError(err)) {
        if (err.response && err.response.status === 401) {
          // Handle 401 Unauthorized error from the server
          const message = err.response.data?.message;
          console.error('Login failed:', message);
          throw new Error(message);
        } else if (err.code === 'ERR_NETWORK') {
          // Handle Network Error
          console.error('Network error:', err.message);
          throw new Error('Tidak dapat terhubung ke server. Periksa koneksi Anda.');
        }
      }
      console.error('Unexpected error:', err);
      throw new Error('Terjadi kesalahan yang tidak diketahui!');
    }
  };

  const loadToken = () =>{
    setAuthToken(token);
  }

  const logout = async () => {
    try {
      const response = await api.post('logout');
      setSession(RESET);
      //setSession(null)
      removeAuthToken();
      return response.data.message;
    } catch (err) {
      handleLogoutApiError(err, setSession);
    }  
  };

  const hasRole = (role: string) => {
    return roles?.includes(role)
  }

  return { loginCredential, loginNfc, logout, loadToken, hasRole, user, token};
}
