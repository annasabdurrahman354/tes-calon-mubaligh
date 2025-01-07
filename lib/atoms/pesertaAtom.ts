import { atom } from 'jotai';
import { PesertaKediri } from '../types/Kediri';
import { PesertaKertosono } from '../types/Kertosono';

export const pesertaKediriAtom = atom<PesertaKediri[] | null>(null);
export const pesertaKertosonoAtom = atom<PesertaKertosono[] | null>(null);