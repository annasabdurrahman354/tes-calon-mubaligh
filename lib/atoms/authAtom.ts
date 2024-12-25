import { atomWithStorage } from 'jotai/utils'
import { Session } from '../types';

export const sessionAtom = atomWithStorage<Session | null>('authUser', null);