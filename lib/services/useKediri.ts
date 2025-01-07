import { useAtom } from "jotai";
import { AkademikKediriForm, AkhlakKediriForm, PesertaKediri } from "../types/Kediri";
import api, { handleApiError } from "./api";
import { pilihPesertaKediriAtom, selectedPesertaKediriAtom } from "../atoms/selectedPesertaAtom";
import { pesertaKediriAtom } from "../atoms/pesertaAtom";

export function useKediri() {
    const [pesertaKediri, setPesertaKediri] = useAtom(pesertaKediriAtom);
    const [selectedPesertaKediri, setSelectedPesertaKediri] = useAtom(selectedPesertaKediriAtom);
    const [pilihPesertaKediri, setPilihPesertaKediri] = useAtom(pilihPesertaKediriAtom);

    const getPesertaKediri = async (
      jenis_kelamin?: string,
      kelompok?: string,
      nama?: string
    ): Promise<PesertaKediri[] | null | any> => {
      try {
        const params: Record<string, string> = {};
    
        if (jenis_kelamin && jenis_kelamin !== '-') {
          params['filter[siswa.jenis_kelamin]'] = jenis_kelamin;
        }
        if (kelompok && kelompok !== '-') {
          params['filter[kelompok]'] = kelompok;
        }
        if (nama) {
          params['filter[siswa.nama]'] = nama;
        }
    
        const response = await api.get('peserta-kediri', { params });
        setPesertaKediri(response.data);
        return response.data;
      } catch (err) {
        handleApiError(err);
      }
    };
    
    const getPesertaKediriByNfc = async (nfc: string): Promise<PesertaKediri | null | any> => {
      try {
        const response = await api.get('peserta-kediri/getByNfc', {
          params: { 'nfc': nfc },
        });
        return response.data.data;
      } catch (err) {
        handleApiError(err);
      }
    };
    
    const storeAkademikKediri = async (
      peserta_kediri_id: string,
      nilai_makna: string,
      nilai_keterangan: string,
      nilai_penjelasan: string,
      nilai_pemahaman: string,
      catatan: string
    ): Promise<AkademikKediriForm | null | any> => {
      try {
        const response = await api.post<AkademikKediriForm>('akademik-kediri', {
          peserta_kediri_id,
          nilai_makna,
          nilai_keterangan,
          nilai_penjelasan,
          nilai_pemahaman,
          catatan,
        });
        console.log(response.data);
        return response.data;
      } catch (err) {
        handleApiError(err);
      }
    };
    
    const storeAkhlakKediri = async (
      peserta_kediri_id: string,
      poin: number,
      catatan: string
    ): Promise<AkhlakKediriForm | null | any> => {
      try {
        const response = await api.post<AkhlakKediriForm>('akhlak-kediri', {
          peserta_kediri_id,
          poin,
          catatan,
        });
        console.log(response.data);
        return response.data;
      } catch (err) {
        handleApiError(err);
      }
    };

    const toggleSelectedPesertaKediri = (pesertaKediri: PesertaKediri) => {
      setSelectedPesertaKediri((prevSelected) => {
          // If the array is null, initialize it as an empty array
          if (!prevSelected) {
              return [pesertaKediri];
          }
  
          // Check if the peserta is already in the list (you can define your own condition)
          const exists = prevSelected.some((item) => item.id === pesertaKediri.id); // assuming `id` is unique
          if (exists) {
              // If it exists, remove it from the list
              return prevSelected.filter((item) => item.id !== pesertaKediri.id);
          }
  
          // Add the new peserta to the list if not already present
          return [...prevSelected, pesertaKediri];
      });
    };

    const addSelectedPesertaKediri = (pesertaKediri: PesertaKediri) => {
      setSelectedPesertaKediri((prevSelected) => {
          // If the array is null, initialize it as an empty array
          if (!prevSelected) {
              return [pesertaKediri];
          }
  
          // Check if the peserta is already in the list (you can define your own condition)
          const exists = prevSelected.some((item) => item.id === pesertaKediri.id); // assuming `id` is unique
          if (exists) {
              // If it exists, remove it from the list
              return prevSelected;
          }
  
          // Add the new peserta to the list if not already present
          return [...prevSelected, pesertaKediri];
      });
    };


    const removeSelectedPesertaKediri = (pesertaKediri: PesertaKediri) => {
      setSelectedPesertaKediri((prevSelected) => {
          return prevSelected.filter((item) => item.id !== pesertaKediri.id);
      });
    };

    const clearSelectedPesertaKediri = () => {
      setSelectedPesertaKediri([]);
    };

    const isSelectedPesertaKediri = (id: string) => {
      return selectedPesertaKediri?.some((item) => item.id === id);
    };
  
    return { pesertaKediri, getPesertaKediri, getPesertaKediriByNfc, storeAkademikKediri, storeAkhlakKediri, selectedPesertaKediri, addSelectedPesertaKediri, removeSelectedPesertaKediri, clearSelectedPesertaKediri, toggleSelectedPesertaKediri, isSelectedPesertaKediri, pilihPesertaKediri, setPilihPesertaKediri};
  }
  