import { atomWithStorage } from 'jotai/utils'
import { Session } from '../types';
import { atom } from 'jotai';
import AsyncStorage from '@react-native-async-storage/async-storage';

//export const sessionAtom = atomWithStorage<Session>('authUser', {token: null, user: null}, undefined, { getOnInit: true });
export const sessionAtom = atom<Session | null>();