export type AkhlakKertosono = {
  id: string;
  guru_id: string;
  guru_nama: string;
  poin: number;
  catatan: string;
}

export type AkademikKertosono = {
  id: string;
  guru_id: string;
  guru_nama: string;
  penilaian: string;
  kekurangan: string[];
  catatan: string | null;
}

export type AkhlakKertosonoForm = {
  peserta_kertosono_id: string;
  poin: number;
  catatan: string;
}

export type AkademikKertosonoForm = {
  peserta_kertosono_id: string;
  penilaian: string;
  kekurangan: string[] | null;
  catatan: string | null;
}

export type PesertaKertosono = {
  id: string;
  periode_id: string;
  siswa_id: string;
  nama: string;
  nama_panggilan: string;
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
  count_akademik_lulus: number;
  count_akademik_tidak_lulus: number;
  total_poin_akhlak: number;
  hasil_sistem: number;
  telah_disimak: boolean;
  akhlak: AkhlakKertosono[];
  akademik: AkademikKertosono[];
}