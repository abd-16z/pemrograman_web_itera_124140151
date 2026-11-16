# ==============================================================================
# Berkas: latihan_truk.py
# Deskripsi: Latihan Mandiri 3 - Subclass Truk(Kendaraan) Ekspedisi Kargo
# ==============================================================================

# Superclass Kendaraan (sesuai materi bagian 3 Inheritance)
class Kendaraan:
    def __init__(self, merek: str, model: str, tahun: int):
        self.merek = merek
        self.model = model
        self.tahun = tahun
        self.odometer = 0

    def deskripsi(self) -> str:
        return f"{self.merek} {self.model} ({self.tahun})"

    def tambah_jarak(self, km: float):
        if km > 0:
            self.odometer += km
            print(f"[{self.merek}] Menempuh perjalanan +{km} km. Total Odo: {self.odometer} km")
        else:
            print("Nilai kilometer tambahan tidak valid!")


# Subclass Truk yang mewarisi Kendaraan
class Truk(Kendaraan):
    def __init__(self, merek: str, model: str, tahun: int, kapasitas_maksimal_ton: float):
        # Memanggil constructor superclass Kendaraan
        super().__init__(merek, model, tahun)
        self.kapasitas_maksimal_ton = kapasitas_maksimal_ton
        self.muatan_saat_ini = 0.0

    def muat_barang(self, berat_ton: float):
        """Memvalidasi dan menambahkan muatan agar tidak melebihi kapasitas maksimal truk"""
        if berat_ton <= 0:
            print("Gagal: Berat barang yang dimuat harus lebih dari 0 ton!")
            return

        if self.muatan_saat_ini + berat_ton <= self.kapasitas_maksimal_ton:
            self.muatan_saat_ini += berat_ton
            print(
                f"[{self.merek} {self.model}] Berhasil memuat +{berat_ton} ton. "
                f"Muatan sekarang: {self.muatan_saat_ini}/{self.kapasitas_maksimal_ton} ton."
            )
        else:
            kelebihan = (self.muatan_saat_ini + berat_ton) - self.kapasitas_maksimal_ton
            print(
                f"[{self.merek} {self.model}] Gagal memuat {berat_ton} ton! "
                f"Melebihi kapasitas maksimal sebesar {kelebihan:.1f} ton."
            )

    # Method Overriding: menampilkan deskripsi truk beserta beban muatan saat ini
    def deskripsi(self) -> str:
        info_dasar = super().deskripsi()
        return (
            f"{info_dasar} [Truk Kargo | "
            f"Muatan: {self.muatan_saat_ini}/{self.kapasitas_maksimal_ton} Ton]"
        )


# --- PROGRAM UTAMA (UJI COBA) ---
if __name__ == "__main__":
    truk_fuso = Truk("Mitsubishi", "Fuso Fighter", 2023, kapasitas_maksimal_ton=15.0)

    print("--- Kondisi Awal Truk ---")
    print(truk_fuso.deskripsi())

    print("\n--- Proses Pemuatan Barang Kargo ---")
    truk_fuso.muat_barang(6.5)
    truk_fuso.muat_barang(5.0)
    truk_fuso.muat_barang(5.0)  # Akan ditolak karena totalnya 16.5 ton (> 15.0 ton)

    print("\n--- Kondisi Akhir & Perjalanan ---")
    truk_fuso.tambah_jarak(85.0)
    print(truk_fuso.deskripsi())
