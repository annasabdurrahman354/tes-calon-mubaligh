export type AkhlakKediri = {
  id: string;
  guru_id: string;
  guru_nama: string;
  catatan: string;
  poin: number;
  created_at: string | null;
}

export type AkademikKediri = {
  id: string;
  guru_id: string;
  guru_nama: string;
  nilai_makna: number;
  nilai_keterangan: number;
  nilai_penjelasan: number;
  nilai_pemahaman: number;
  catatan: string | null;
  created_at: string | null;
}

export type AkhlakKediriForm = {
  peserta_kediri_id: string;
  poin: number;
  catatan: string;
}

export type AkademikKediriForm = {
  peserta_kediri_id: string;
  nilai_makna: number;
  nilai_keterangan: number;
  nilai_penjelasan: number;
  nilai_pemahaman: number;
  catatan: string | null;
}

export type PesertaKediri = {
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
  total_poin_akhlak: number;
  avg_nilai_makna: number;
  avg_nilai_keterangan: number;
  avg_nilai_penjelasan: number;
  avg_nilai_pemahaman: number;
  avg_nilai: number;
  hasil_sistem: number;
  telah_disimak: boolean;
  foto_smartcard: string;
  akhlak: AkhlakKediri[];
  akademik: AkademikKediri[];
}