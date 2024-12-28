import { useAtom } from "jotai";
import { AkademikKediriForm, AkhlakKediriForm, PesertaKediri } from "../types/Kediri";
import api from "./api";
import { pilihPesertaKediriAtom, selectedPesertaKediriAtom } from "../atoms/selectedPesertaAtom";
import { pesertaKediriAtom } from "../atoms/pesertaAtom";
import { isAxiosError } from "axios";

export function useKediri() {
    const [pesertaKediri, setPesertaKediri] = useAtom(pesertaKediriAtom);
    const [selectedPesertaKediri, setSelectedPesertaKediri] = useAtom(selectedPesertaKediriAtom);
    const [pilihPesertaKediri, setPilihPesertaKediri] = useAtom(pilihPesertaKediriAtom);

    const getPesertaKediri = async (
      jenis_kelamin?: string,
      kelompok?: string,
      nama?: string
    ): Promise<PesertaKediri[] | null> => {
      try {
        // Construct query parameters based on provided arguments
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
    
        // Make the API request with the constructed params
        const response = await api.get('peserta-kediri', { params });
    
        // Assuming response.data contains the peserta Kediri data
        setPesertaKediri(response.data);
    
        return response.data; // Return the response data, assuming it's the list of PesertaKediri
    
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

    const getPesertaKediriByNfc = async (
      nfc: string,
    ): Promise<PesertaKediri | null> => {
      try {
        // Make the API request with the constructed query string
        const response = await api.get('peserta-kediri/getByNfc', {
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

    const storeAkademikKediri = async (
      peserta_kediri_id: string,
      nilai_makna: string,
      nilai_keterangan: string,
      nilai_penjelasan: string,
      nilai_pemahaman: string,
      catatan: string
    ): Promise<AkademikKediriForm> => {
      try {
        // Make the API request with the constructed payload
        const response = await api.post<AkademikKediriForm>('akademik-kediri', {
          peserta_kediri_id,
          nilai_makna,
          nilai_keterangan,
          nilai_penjelasan,
          nilai_pemahaman,
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

    const storeAkhlakKediri = async (
      peserta_kediri_id: string,
      poin: number,
      catatan: string,
    ): Promise<AkhlakKediriForm> => {
      try {
        // Make the API request with the constructed payload
        const response = await api.post<AkhlakKediriForm>('akhlak-kediri', {
          peserta_kediri_id,
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
  