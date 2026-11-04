"""Program utama untuk menguji seluruh fungsi
   dan konstanta dari modul math_operations."""
# Cara Impor 1: Mengimpor seluruh modul secara langsung
import math_operations

# Cara Impor 2: Mengimpor modul dengan menggunakan alias (as)
import math_operations as mo

# Cara Impor 3: Mengimpor konstanta dan fungsi spesifik langsung ke namespace
from math_operations import (
    PI,
    celsius_ke_fahrenheit,
    celsius_ke_kelvin,
)


def main():
    """Fungsi utama untuk menguji seluruh fungsi pada modul math_operations."""
    print("=" * 55)
    print("   PENGUJIAN MODUL MATEMATIKA (math_operations.py)")
    print("=" * 55)

    # 1. Pengujian Geometri
    print("\n--- 1. PERHITUNGAN GEOMETRI ---")

    # A. Persegi (Menggunakan Cara Impor 1: math_operations.nama_fungsi)
    sisi = 6.0
    print(f"[Persegi] Sisi = {sisi} cm")
    print(f"  - Luas Persegi            : {math_operations.luas_persegi(sisi):.2f} cm^2")
    print(f"  - Keliling Persegi        : {math_operations.keliling_persegi(sisi):.2f} cm")

    # B. Persegi Panjang (Menggunakan Cara Impor 2: alias mo.nama_fungsi)
    panjang, lebar = 12.0, 5.0
    print(f"\n[Persegi Panjang] Panjang = {panjang} cm, Lebar = {lebar} cm")
    print(f"  - Luas Persegi Panjang    : {mo.luas_persegi_panjang(panjang, lebar):.2f} cm^2")
    print(f"  - Keliling Persegi Panjang: {mo.keliling_persegi_panjang(panjang, lebar):.2f} cm")

    # C. Lingkaran (Menggunakan fungsi dari 'mo' dan konstanta 'PI' dari Cara Impor 3)
    jari_jari = 7.0
    print(f"\n[Lingkaran] Jari-jari = {jari_jari} cm (Konstanta PI = {PI})")
    print(f"  - Luas Lingkaran          : {mo.luas_lingkaran(jari_jari):.2f} cm^2")
    print(f"  - Keliling Lingkaran      : {mo.keliling_lingkaran(jari_jari):.2f} cm")

    # 2. Pengujian Konversi Suhu (Menggunakan Cara Impor 3: pemanggilan langsung)
    print("\n--- 2. KONVERSI TEMPERATUR SUHU ---")
    daftar_suhu_uji = [0.0, 25.0, 37.5, 100.0]

    print(f"| {'Celsius (C)':^14} | {'Fahrenheit (F)':^17} | {'Kelvin (K)':^14} |")
    print("-" * 55)
    for suhu_c in daftar_suhu_uji:
        suhu_f = celsius_ke_fahrenheit(suhu_c)
        suhu_k = celsius_ke_kelvin(suhu_c)
        print(f"| {suhu_c:^14.2f} | {suhu_f:^17.2f} | {suhu_k:^14.2f} |")

    print("=" * 55)


if __name__ == "__main__":
    main()
