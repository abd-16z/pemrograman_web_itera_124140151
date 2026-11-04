"""Modul kustom untuk perhitungan geometri
   (persegi, persegi panjang, lingkaran) dan
   konversi temperatur suhu."""

# Konstanta matematika
PI = 3.14159

# ---------------------------------------------------
# 1. Persegi
# ---------------------------------------------------
def luas_persegi(sisi: float):
    return sisi * sisi


def keliling_persegi(sisi: float):
    return 4 * sisi

# ---------------------------------------------------
# 2. Persegi Panjang
# ---------------------------------------------------
def luas_persegi_panjang(panjang: float, lebar: float):
    return panjang * lebar


def keliling_persegi_panjang(panjang: float, lebar: float):
    return 2 * (panjang + lebar)

# ---------------------------------------------------
# 3. Lingkaran
# ---------------------------------------------------
def luas_lingkaran(jari_jari: float):
    return PI * (jari_jari ** 2)


def keliling_lingkaran(jari_jari: float):
    return 2 * PI * jari_jari

# ---------------------------------------------------
# 4. Konversi Suhu
# ---------------------------------------------------
def celsius_ke_fahrenheit(celsius: float):
    return (celsius * 9 / 5) + 32


def celsius_ke_kelvin(celsius: float):
    return celsius + 273.15


if __name__ == "__main__":
    print("[INFO] Menguji modul math_operations secara langsung:")
    print(f"Konstanta PI             : {PI}")
    print(f"Luas Persegi (s=4)       : {luas_persegi(4)}")
    print(f"Konversi 100 C ke F      : {celsius_ke_fahrenheit(100)} F")
