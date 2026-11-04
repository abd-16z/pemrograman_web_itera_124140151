"""Pengelolaan data nilai akademik mahasiswa, 
   perhitungan nilai akhir, grade, dan statistik."""


def hitung_nilai_akhir(uts: float, uas: float, tugas: float):
    return (0.30 * uts) + (0.40 * uas) + (0.30 * tugas)


def tentukan_grade(nilai_akhir: float):
    if nilai_akhir >= 80:
        return "A"
    elif nilai_akhir >= 70:
        return "B"
    elif nilai_akhir >= 60:
        return "C"
    elif nilai_akhir >= 50:
        return "D"
    else:
        return "E"


def proses_data_mahasiswa(daftar_mahasiswa: list):
    for mhs in daftar_mahasiswa:
        nilai_akhir = hitung_nilai_akhir(
            mhs["nilai_uts"],
            mhs["nilai_uas"],
            mhs["nilai_tugas"],
        )
        mhs["nilai_akhir"] = nilai_akhir
        mhs["grade"] = tentukan_grade(nilai_akhir)


def tampilkan_tabel_mahasiswa(daftar_mahasiswa: list):
    print("=" * 84)
    print(f"{'REKAPITULASI NILAI AKADEMIK MAHASISWA':^84}")
    print("=" * 84)
    print(
        f"| {'No':^3} | {'NIM':<10} | {'Nama Mahasiswa':<22} | "
        f"{'UTS':^5} | {'UAS':^5} | {'Tugas':^5} | {'Akhir':^7} | {'Grade':^5} |"
    )
    print("-" * 84)

    for nomor, mhs in enumerate(daftar_mahasiswa, start=1):
        print(
            f"| {nomor:^3} | {mhs['nim']:<10} | {mhs['nama']:<22} | "
            f"{mhs['nilai_uts']:^5} | {mhs['nilai_uas']:^5} | {mhs['nilai_tugas']:^5} | "
            f"{mhs['nilai_akhir']:^7.2f} | {mhs['grade']:^5} |"
        )
    print("=" * 84)


def cari_nilai_ekstrem(daftar_mahasiswa: list):
    tertinggi = max(daftar_mahasiswa, key=lambda m: m["nilai_akhir"])
    terendah = min(daftar_mahasiswa, key=lambda m: m["nilai_akhir"])
    return tertinggi, terendah


def main():
    # Inisialisasi list berisi 5 dictionary data mahasiswa
    data_mahasiswa = [
        {
            "nama": "Alex",
            "nim": "124140001",
            "nilai_uts": 88,
            "nilai_uas": 92,
            "nilai_tugas": 90,
        },
        {
            "nama": "Billy",
            "nim": "124140002",
            "nilai_uts": 74,
            "nilai_uas": 78,
            "nilai_tugas": 75,
        },
        {
            "nama": "Cherly",
            "nim": "124140003",
            "nilai_uts": 62,
            "nilai_uas": 65,
            "nilai_tugas": 68,
        },
        {
            "nama": "Dian",
            "nim": "124140004",
            "nilai_uts": 55,
            "nilai_uas": 52,
            "nilai_tugas": 58,
        },
        {
            "nama": "Ehsan",
            "nim": "124140005",
            "nilai_uts": 42,
            "nilai_uas": 45,
            "nilai_tugas": 48,
        },
    ]

    proses_data_mahasiswa(data_mahasiswa)

    tampilkan_tabel_mahasiswa(data_mahasiswa)

    mhs_tertinggi, mhs_terendah = cari_nilai_ekstrem(data_mahasiswa)

    print("\n--- RINGKASAN STATISTIK EKSTREM ---")
    print(
        f"Nilai Akhir Tertinggi : {mhs_tertinggi['nama']} ({mhs_tertinggi['nim']}) "
        f"-> {mhs_tertinggi['nilai_akhir']:.2f} (Grade {mhs_tertinggi['grade']})"
    )
    print(
        f"Nilai Akhir Terendah  : {mhs_terendah['nama']} ({mhs_terendah['nim']}) "
        f"-> {mhs_terendah['nilai_akhir']:.2f} (Grade {mhs_terendah['grade']})"
    )


if __name__ == "__main__":
    main()
