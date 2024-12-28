import { atom } from 'jotai';
import { PesertaKediri } from '../types/Kediri';
import { PesertaKertosono } from '../types/Kertosono';

export const selectedPesertaKediriAtom = atom<PesertaKediri[]>([]);
export const selectedPesertaKertosonoAtom = atom<PesertaKertosono[]>([]);
export const pilihPesertaKediriAtom = atom<PesertaKediri | null>(null);
export const pilihPesertaKertosonoAtom = atom<PesertaKertosono | null>(null);

