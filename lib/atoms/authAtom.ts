import { atomWithStorage } from 'jotai/utils'
import { Session } from '../types';
import { atom } from 'jotai';

//export const sessionAtom = atomWithStorage<Session>('authUser', {token: null, user: null});
export const sessionAtom = atom<Session | null>();