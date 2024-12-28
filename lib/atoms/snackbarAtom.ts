import { atom } from 'jotai';

export const snackbarAtom = atom<{message: string, visible: boolean}>({message: '', visible: false});