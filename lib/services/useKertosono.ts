import { useAtom } from "jotai";
import { AkademikKertosonoForm, AkhlakKertosonoForm, PesertaKertosono } from "../types/Kertosono";
import api, { handleApiError } from "./api";
import { formValuesAtom, pilihPesertaKertosonoAtom, selectedPesertaKertosonoAtom } from "../atoms/selectedPesertaAtom";
import { pesertaKertosonoAtom } from "../atoms/pesertaAtom";

export function useKertosono() {
    const [pesertaKertosono, setPesertaKertosono] = useAtom(pesertaKertosonoAtom);
    const [selectedPesertaKertosono, setSelectedPesertaKertosono] = useAtom(selectedPesertaKertosonoAtom);
    const [pilihPesertaKertosono, setPilihPesertaKertosono] = useAtom(pilihPesertaKertosonoAtom);
    const [formValues, setFormValues] = useAtom(formValuesAtom);

    const getPesertaKertosono = async (
      jenis_kelamin?: string,
      namaOrCocard?: string
    ): Promise<PesertaKertosono[] | null | any> => {
      try {
        const params: Record<string, string> = {};
    
        if (jenis_kelamin && jenis_kelamin !== '-') {
          params['filter[siswa.jenis_kelamin]'] = jenis_kelamin;
        }
        if (namaOrCocard) {
          params['filter[namaOrCocard]'] = namaOrCocard;
        }
    
        const response = await api.get('peserta-kertosono', { params });
        setPesertaKertosono(response.data);
    
        return response.data;
      } catch (err) {
        handleApiError(err);
      }
    };

    const getAuthSimak = async (
      jenis_kelamin?: string,
      namaOrCocard?: string
    ): Promise<PesertaKertosono[] | null | any> => {
      try {
        const params: Record<string, string> = {};
    
        if (jenis_kelamin && jenis_kelamin !== '-') {
          params['filter[siswa.jenis_kelamin]'] = jenis_kelamin;
        }
        if (namaOrCocard) {
          params['filter[namaOrCocard]'] = namaOrCocard;
        }

        params['filter'] = 'anda-simak';
    
        const response = await api.get('peserta-kertosono', { params });
        setPesertaKertosono(response.data);
    
        return response.data;
      } catch (err) {
        handleApiError(err);
      }
    };
    
    const getPesertaKertosonoByNfc = async (nfc: string): Promise<PesertaKertosono | null | any> => {
      try {
        const response = await api.get('peserta-kertosono/getByNfc', { params: { nfc } });
        return response.data.data;
      } catch (err) {
        handleApiError(err);
      }
    };
    
    const storeAkademikKertosono = async (
      tes_santri_id: string,
      penilaian: string,
      kekurangan_tajwid: string[],
      kekurangan_khusus: string[],
      kekurangan_keserasian: string[],
      kekurangan_kelancaran: string[],
      catatan: string | null,
      rekomendasi_penarikan: boolean,
      durasi_penilaian: number
    ): Promise<AkademikKertosonoForm | null | any> => {
      try {
        const response = await api.post<AkademikKertosonoForm>('akademik-kertosono', {
          tes_santri_id,
          penilaian,
          kekurangan_tajwid,
          kekurangan_khusus,
          kekurangan_keserasian,
          kekurangan_kelancaran,
          catatan,
          rekomendasi_penarikan,
          durasi_penilaian
        });
        return response.data;
      } catch (err) {
        handleApiError(err);
      }
    };
    
    const storeAkhlakKertosono = async (
      tes_santri_id: string,
      catatan: string
    ): Promise<AkhlakKertosonoForm | null | any> => {
      try {
        const response = await api.post<AkhlakKertosonoForm>('akhlak-kertosono', {
          tes_santri_id,
          catatan,
        });
        return response.data;
      } catch (err) {
        handleApiError(err);
      }
    };

    const toggleSelectedPesertaKertosono = (pesertaKertosono: PesertaKertosono) => {
      setSelectedPesertaKertosono((prevSelected) => {
          // If the array is null, initialize it as an empty array
          if (!prevSelected) {
              return [pesertaKertosono];
          }
  
          // Check if the peserta is already in the list (you can define your own condition)
          const exists = prevSelected.some((item) => item.id === pesertaKertosono.id); // assuming `id` is unique
          if (exists) {
              // If it exists, remove it from the list
              return prevSelected.filter((item) => item.id !== pesertaKertosono.id);
          }
  
          // Add the new peserta to the list if not already present
          return [...prevSelected, pesertaKertosono];
      });
    };

    const addSelectedPesertaKertosono = (pesertaKertosono: PesertaKertosono) => {
      setSelectedPesertaKertosono((prevSelected) => {
          // If the array is null, initialize it as an empty array
          if (!prevSelected) {
              return [pesertaKertosono];
          }
  
          // Check if the peserta is already in the list (you can define your own condition)
          const exists = prevSelected.some((item) => item.id === pesertaKertosono.id); // assuming `id` is unique
          if (exists) {
              // If it exists, remove it from the list
              return prevSelected;
          }
  
          // Add the new peserta to the list if not already present
          return [...prevSelected, pesertaKertosono];
      });
    };


    const removeSelectedPesertaKertosono = (pesertaKertosono: PesertaKertosono) => {
      setSelectedPesertaKertosono((prevSelected) => {
          return prevSelected.filter((item) => item.id !== pesertaKertosono.id);
      });
    };

    const clearSelectedPesertaKertosono = () => {
      setSelectedPesertaKertosono([]);
    };

    const isSelectedPesertaKertosono = (id: string) => {
      return selectedPesertaKertosono?.some((item) => item.id === id);
    };
  
    return { pesertaKertosono, getPesertaKertosono, getAuthSimak, getPesertaKertosonoByNfc, storeAkademikKertosono, storeAkhlakKertosono, selectedPesertaKertosono, addSelectedPesertaKertosono, removeSelectedPesertaKertosono, clearSelectedPesertaKertosono, toggleSelectedPesertaKertosono, isSelectedPesertaKertosono, pilihPesertaKertosono, setPilihPesertaKertosono, formValues, setFormValues};
  }
  