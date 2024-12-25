import { atom } from 'jotai';
import { Session } from '../types';

export const sessionAtom = atom<Session | null>(null);