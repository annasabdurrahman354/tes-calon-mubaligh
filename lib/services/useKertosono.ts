import { useAtom } from "jotai";
import { AkademikKertosonoForm, AkhlakKertosonoForm, PesertaKertosono } from "../types/Kertosono";
import api from "./api";
import { pilihPesertaKertosonoAtom, selectedPesertaKertosonoAtom } from "../atoms/selectedPesertaAtom";
import { pesertaKertosonoAtom } from "../atoms/pesertaAtom";
import { isAxiosError } from "axios";

export function useKertosono() {
    const [pesertaKertosono, setPesertaKertosono] = useAtom(pesertaKertosonoAtom);
    const [selectedPesertaKertosono, setSelectedPesertaKertosono] = useAtom(selectedPesertaKertosonoAtom);
    const [pilihPesertaKertosono, setPilihPesertaKertosono] = useAtom(pilihPesertaKertosonoAtom);

    const getPesertaKertosono = async (
      jenis_kelamin?: string,
      namaOrCocard?: string
    ): Promise<PesertaKertosono[] | null> => {
      try {
        // Construct query parameters based on provided arguments
        const params: Record<string, string> = {};
    
        if (jenis_kelamin && jenis_kelamin !== '-') {
          params['filter[siswa.jenis_kelamin]'] = jenis_kelamin;
        }
        if (namaOrCocard) {
          params['filter[namaOrCocard]'] = namaOrCocard;
        }
    
        // Make the API request with the constructed params
        const response = await api.get('peserta-kertosono', { params });
    
        // Assuming response.data contains the peserta Kertosono data
        setPesertaKertosono(response.data);
        console.log(response.data);
    
        return response.data; // Return the response data, assuming it's the list of PesertaKertosono
    
      } catch (err) {
        if (isAxiosError(err)) {
          if (err.response && err.response.status) {
            // Handle 401 Unauthorized error from the server
            const message = err.response.data?.message || 'Terjadi kesalahan. Coba ulangi lagi!';
            console.error('Fetch Failed:', message);
            throw new Error(message);
          } else if (err.code === 'ERR_NETWORK') {
            // Handle Network Error
            console.error('Network error:', err.message);
            throw new Error('Tidak dapat terhubung ke server. Periksa koneksi Anda.');
          }
        }
        console.error('Unexpected error:', err);
        throw new Error('Terjadi kesalahan yang tidak diketahui!');
      }
    };    

    const getPesertaKertosonoByNfc = async (
      nfc: string,
    ): Promise<PesertaKertosono | null> => {
      try {
        // Make the API request with the constructed query string
        const response = await api.get('peserta-kertosono/getByNfc', {
          params: {
            nfc: nfc
          }
        });        
       
        return response.data.data;
      } catch (err) {
        if (isAxiosError(err)) {
          if (err.response && err.response.status) {
            // Handle 401 Unauthorized error from the server
            const message = err.response.data?.message || 'Terjadi kesalahan. Coba ulangi lagi!';
            console.error('Fetch Failed:', message);
            throw new Error(message);
          } else if (err.code === 'ERR_NETWORK') {
            // Handle Network Error
            console.error('Network error:', err.message);
            throw new Error('Tidak dapat terhubung ke server. Periksa koneksi Anda.');
          }
        }
        console.error('Unexpected error:', err);
        throw new Error('Terjadi kesalahan yang tidak diketahui!');
      }
    };

    const storeAkademikKertosono = async (
      peserta_kertosono_id: string,
      penilaian: string,
      kekurangan: string[] | null,
      catatan: string | null,
    ): Promise<AkademikKertosonoForm> => {
      try {
        // Make the API request with the constructed payload
        const response = await api.post<AkademikKertosonoForm>('akademik-kertosono', {
          peserta_kertosono_id,
          penilaian,
          kekurangan,
          catatan,
        });

        console.log( response.data)
        return response.data; // Return the response data directly
      } catch (err) {
        if (isAxiosError(err)) {
          if (err.response && err.response.status) {
            // Handle server response error
            const message = err.response.data?.message || 'Terjadi kesalahan. Coba ulangi lagi!';
            console.error('Store Failed:', message, err.response.data || err.message);
            throw new Error(message);
          } else if (err.code === 'ERR_NETWORK') {
            // Handle network-related errors
            console.error('Network error:', err.message);
            throw new Error('Tidak dapat terhubung ke server. Periksa koneksi Anda.');
          }
        }
        // Log unexpected errors
        console.error('Unexpected error:', err);
        throw new Error('Terjadi kesalahan yang tidak diketahui!');
      }
    };    

    const storeAkhlakKertosono = async (
      peserta_kertosono_id: string,
      poin: number,
      catatan: string,
    ): Promise<AkhlakKertosonoForm> => {
      try {
        // Make the API request with the constructed payload
        const response = await api.post<AkhlakKertosonoForm>('akhlak-kertosono', {
          peserta_kertosono_id,
          poin,
          catatan,
        });
        
        console.log( response.data)
        return response.data; // Return the response data
      } catch (err) {
        if (isAxiosError(err)) {
          if (err.response && err.response.status) {
            // Handle server error with a custom message
            const message = err.response.data?.message || 'Terjadi kesalahan. Coba ulangi lagi!';
            console.error('Store Failed:', message, err.response.data || err.message);
            throw new Error(message);
          } else if (err.code === 'ERR_NETWORK') {
            // Handle network errors
            console.error('Network error:', err.message);
            throw new Error('Tidak dapat terhubung ke server. Periksa koneksi Anda.');
          }
        }
        // Handle unexpected errors
        console.error('Unexpected error:', err);
        throw new Error('Terjadi kesalahan yang tidak diketahui!');
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
  
    return { pesertaKertosono, getPesertaKertosono, getPesertaKertosonoByNfc, storeAkademikKertosono, storeAkhlakKertosono, selectedPesertaKertosono, addSelectedPesertaKertosono, removeSelectedPesertaKertosono, clearSelectedPesertaKertosono, toggleSelectedPesertaKertosono, isSelectedPesertaKertosono, pilihPesertaKertosono, setPilihPesertaKertosono};
  }
  