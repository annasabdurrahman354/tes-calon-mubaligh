export type AkhlakKertosono = {
  id: string;
  guru_id: string;
  guru_nama: string;
  poin: number;
  catatan: string;
  created_at: string | null;
}

export type AkademikKertosono = {
  id: string;
  guru_id: string;
  guru_nama: string;
  penilaian: string;
  kekurangan_tajwid: string[];
  kekurangan_khusus: string[];
  kekurangan_keserasian: string[];
  kekurangan_kelancaran: string[];
  catatan: string | null;
  durasi_penilaian: number;
  created_at: string | null;
}

export type AkhlakKertosonoForm = {
  peserta_kertosono_id: string;
  poin: number;
  catatan: string;
}

export type AkademikKertosonoForm = {
  peserta_kertosono_id: string;
  penilaian: string;
  kekurangan_tajwid: string[];
  kekurangan_khusus: string[];
  kekurangan_keserasian: string[];
  kekurangan_kelancaran: string[];
  catatan: string | null;
  durasi_penilaian: number;
}

export type PesertaKertosono = {
  id: string;
  periode_id: string;
  siswa_id: string;
  nama: string;
  nama_panggilan: string;
  jenis_kelamin: string;
  kelompok: string;
  nomor_cocard: number;
  nis: string;
  nik: string;
  nfc: string;
  asal_pondok_id: number;
  asal_pondok_nama: string ;
  asal_daerah_id: number;
  asal_daerah_nama: string;
  pendidikan: string;
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