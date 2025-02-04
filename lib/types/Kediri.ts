export type AkhlakKediri = {
  id: string;
  guru_id: string;
  guru_nama: string;
  guru_foto: string;
  catatan: string | null;
  poin: number | null;
  created_at: string;
}

export type AkademikKediri = {
  id: string;
  guru_id: string;
  guru_nama: string;
  guru_foto: string;
  nilai_makna: number;
  nilai_keterangan: number;
  nilai_penjelasan: number;
  nilai_pemahaman: number;
  catatan: string | null;
  created_at: string;
}

export type AkhlakKediriForm = {
  tes_santri_id: string;
  poin: number;
  catatan: string;
}

export type AkademikKediriForm = {
  tes_santri_id: string;
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
  nama_lengkap: string;
  nama_panggilan: string;
  jenis_kelamin: string;
  kelompok: string;
  nomor_cocard: number;
  nis: string | null;
  nik: string;
  rfid: string | null;
  kota_nama: string | null;
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
  total_poin_akhlak: number | null;
  avg_nilai_makna: number | null;
  avg_nilai_keterangan: number | null;
  avg_nilai_penjelasan: number | null;
  avg_nilai_pemahaman: number | null;
  avg_nilai: number | null;
  hasil_sistem: string;
  telah_disimak: boolean;
  foto_smartcard: string;
  akhlak: AkhlakKediri[];
  akademik: AkademikKediri[];
}