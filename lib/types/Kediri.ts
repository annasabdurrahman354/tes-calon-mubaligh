export type AkhlakKediri = {
  id: string;
  guru_id: string;
  guru_nama: string;
  catatan: string;
  poin: number;
}

export type AkademikKediri = {
  id: string;
  guru_id: string;
  guru_nama: string;
  nilai_makna: number;
  nilai_keterangan: number;
  nilai_penjelasan: number;
  nilai_pemahaman: number;
  rata_rata: number;
  catatan: string | null;
  status_lulus: string;
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
  akhlak: AkhlakKediri[];
  akademik: AkademikKediri[];
}