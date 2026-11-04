"""Program penghitung BMI (Body Mass Index) sederhana."""


def hitung_bmi(berat: float, tinggi: float):
    return berat / (tinggi ** 2)


def tentukan_kategori(bmi: float):
    if bmi < 18.5:
        return "Kekurangan berat badan"
    elif bmi < 25:
        return "Berat badan normal"
    elif bmi < 30:
        return "Berat badan berlebih"
    else:
        return "Obesitas"


def main():
    print("=== PROGRAM PENGHITUNG BMI ===")
    berat = float(input("Masukkan berat badan (kg)  : "))
    tinggi = float(input("Masukkan tinggi badan (m)  : "))

    if berat <= 0 or tinggi <= 0:
        print("Error: berat dan tinggi badan harus lebih dari nol!")
        return

    bmi = hitung_bmi(berat, tinggi)
    kategori = tentukan_kategori(bmi)

    print("\n--- HASIL PERHITUNGAN ---")
    print(f"Berat badan : {berat:.2f} kg")
    print(f"Tinggi badan: {tinggi:.2f} m")
    print(f"Nilai BMI   : {bmi:.2f}")
    print(f"Kategori    : {kategori}")


if __name__ == "__main__":
    main()