import axios from 'axios';
import { atom, useAtom, useAtomValue } from 'jotai';
import { sessionAtom } from '../atoms/authAtom';
import { Session } from '../types/Auth';
import { BASE_URL } from '../constants/endpoint';

export function useAuth() {
  const [session, setSession] = useAtom(sessionAtom);

  const user = useAtomValue(sessionAtom)?.user;
  const token = useAtomValue(sessionAtom)?.token;

  const loginCredential = async (username: string, password: string): Promise<Session | null> => {
    try {
      const response = await axios.post(BASE_URL + 'login/credential', {
        username,
        password,
      });

      const { token, user } = response.data;
      const sessionData: Session = { token, user };

      setSession(sessionData);

      return sessionData;

    } catch (err) {
      if (axios.isAxiosError(err)) {
        // Handle Axios-specific error
        const message = err.response?.data?.message || 'Username atau password tidak valid!';
        console.error(message);
        throw new Error(message);
      } else if (err instanceof Error) {
        // Handle other types of errors
        console.error(err.message);
        throw err;
      } else {
        // Handle unexpected error types
        console.error('Terjadi kesalahan', err);
        throw new Error('Terjadi kesalahan!');
      }
    }
  };

  const logout = () => {
    setSession(null);
  };

  return { loginCredential, logout, user, token };
}
