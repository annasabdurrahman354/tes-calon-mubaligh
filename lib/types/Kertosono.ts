export type AkhlakKertosono = {
  id: string;
  guru_id: string;
  guru_nama: string;
  guru_foto: string;
  poin: number;
  catatan: string;
  created_at: string | null;
};

export type AkademikKertosono = {
  id: string;
  guru_id: string;
  guru_nama: string;
  guru_foto: string;
  penilaian: string;
  kekurangan_tajwid: string[];
  kekurangan_khusus: string[];
  kekurangan_keserasian: string[];
  kekurangan_kelancaran: string[];
  catatan: string | null;
  rekomendasi_penarikan: boolean;
  durasi_penilaian: number;
  created_at: string | null;
};

export type AkhlakKertosonoForm = {
  tes_santri_id: string;
  catatan: string;
};

export type AkademikKertosonoForm = {
  tes_santri_id: string;
  penilaian: string;
  kekurangan_tajwid: string[];
  kekurangan_khusus: string[];
  kekurangan_keserasian: string[];
  kekurangan_kelancaran: string[];
  catatan: string | null;
  rekomendasi_penarikan: boolean;
  durasi_penilaian: number;
};

export type PesertaKertosono = {
  id: string;
  periode_id: string;
  nispn: string;
  nama_lengkap: string;
  nama_panggilan: string | null;
  jenis_kelamin: string;
  kelompok: string;
  nomor_cocard: number;
  nis: string;
  nik: string;
  rfid: string;
  kota_nama: string;
  asal_pondok_nama: string;
  asal_daerah_nama: string;
  pendidikan: string;
  status_mondok: string;
  keahlian: string;
  hobi: string;
  umur: number;
  nama_ayah: string;
  riwayat_tes: number;
  jumlah_penyimakan: number;
  count_akademik_lulus: number;
  count_akademik_tidak_lulus: number;
  total_poin_akhlak: number;
  hasil_sistem: number;
  telah_disimak: boolean;
  foto_smartcard: string;
  akhlak: AkhlakKertosono[];
  akademik: AkademikKertosono[];
}

export function getFirstValidWord(text: string) {
  const words = text.trim().split(/\s+/); // Split by spaces while handling multiple spaces
  if (words.length === 0) return ''; // Return empty if no words exist

  if (words[0].length > 2 || words.length === 1) {
    return words[0]; // Return first word if it's longer than 2 chars or if it's the only word
  }

  return words.length > 1 ? words[1] : words[0]; // Otherwise, return second word if available
}