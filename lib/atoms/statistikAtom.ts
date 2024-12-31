import { atomWithStorage } from 'jotai/utils'

export const statistikKediriAtom = atomWithStorage('statistik-kediri', {
    "periode_tes" : '-',
    "overall": {
        "total_active_peserta": '-',
        "min_akademik_per_peserta": '-',
        "max_akademik_per_peserta": '-',
        "user_akademik_count": '-',
        "hasil_sistem": {
            "lulus": '-',
            "tidak_lulus": '-',
            "perlu_musyawarah": '-',
            "belum_pengetesan": '-'
        }
    },
    "by_gender": {
        "Laki-laki": {
            "total_active_peserta": '-',
            "min_akademik_per_peserta": '-',
            "max_akademik_per_peserta": '-',
            "user_akademik_count":'-',
            "hasil_sistem": {
                "lulus": '-',
                "tidak_lulus": '-',
                "perlu_musyawarah": '-' ,
                "belum_pengetesan": '-'
            }
        },
        "Perempuan": {
            "total_active_peserta": '-',
            "min_akademik_per_peserta": '-',
            "max_akademik_per_peserta": '-',
            "user_akademik_count": '-',
            "hasil_sistem": {
                "lulus": '-',
                "tidak_lulus": '-',
                "perlu_musyawarah": '-',
                "belum_pengetesan": '-'
            }
        }
    }
});

export const statistikKertosonoAtom = atomWithStorage('statistik-kertosono', {
    "periode_tes" : '-',
    "overall": {
        "total_active_peserta": '-',
        "min_akademik_per_peserta": '-',
        "max_akademik_per_peserta": '-',
        "user_akademik_count": '-',
        "hasil_sistem": {
            "lulus": '-',
            "tidak_lulus": '-',
            "perlu_musyawarah": '-',
            "belum_pengetesan": '-'
        }
    },
    "by_gender": {
        "Laki-laki": {
            "total_active_peserta": '-',
            "min_akademik_per_peserta": '-',
            "max_akademik_per_peserta": '-',
            "user_akademik_count":'-',
            "hasil_sistem": {
                "lulus": '-',
                "tidak_lulus": '-',
                "perlu_musyawarah": '-' ,
                "belum_pengetesan": '-'
            }
        },
        "Perempuan": {
            "total_active_peserta": '-',
            "min_akademik_per_peserta": '-',
            "max_akademik_per_peserta": '-',
            "user_akademik_count": '-',
            "hasil_sistem": {
                "lulus": '-',
                "tidak_lulus": '-',
                "perlu_musyawarah": '-',
                "belum_pengetesan": '-'
            }
        }
    }
});
