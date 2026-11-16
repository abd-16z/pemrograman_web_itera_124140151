# ==============================================================================
# Berkas: latihan_karyawan.py
# Deskripsi: Latihan Mandiri 4 - Enkapsulasi Penggajian Karyawan
# ==============================================================================

class Karyawan:
    UMR_MINIMAL = 3200000.0  # Standar Upah Minimum Regional (Rp 3.200.000)

    def __init__(self, nama: str, jabatan: str, gaji_pokok: float):
        # Atribut Publik
        self.nama = nama
        self.jabatan = jabatan

        # Atribut Private (menggunakan setter agar langsung tervalidasi saat inisialisasi)
        self.__gaji_pokok = self.UMR_MINIMAL
        self.gaji_pokok = gaji_pokok

    # Property Getter untuk membaca __gaji_pokok
    @property
    def gaji_pokok(self) -> float:
        return self.__gaji_pokok

    # Property Setter untuk memvalidasi gaji pokok minimal setara UMR
    @gaji_pokok.setter
    def gaji_pokok(self, nominal_baru: float):
        if nominal_baru < self.UMR_MINIMAL:
            print(
                f"[PERINGATAN] Gaji Rp {nominal_baru:,.0f} untuk {self.nama} ditolak! "
                f"Tidak boleh di bawah UMR (Rp {self.UMR_MINIMAL:,.0f})."
            )
        else:
            self.__gaji_pokok = float(nominal_baru)
            print(f"[SUKSES] Gaji pokok {self.nama} ditetapkan sebesar Rp {self.__gaji_pokok:,.0f}")

    def hitung_gaji_bersih(self, pajak_persen: float) -> float:
        """Menghitung gaji bersih setelah dikurangi potongan pajak (%)"""
        potongan_pajak = self.__gaji_pokok * (pajak_persen / 100)
        return self.__gaji_pokok - potongan_pajak

    def cetak_slip_gaji(self, pajak_persen: float = 5.0):
        gaji_bersih = self.hitung_gaji_bersih(pajak_persen)
        print(f"\n=== SLIP GAJI KARYAWAN ===")
        print(f"Nama        : {self.nama}")
        print(f"Jabatan     : {self.jabatan}")
        print(f"Gaji Pokok  : Rp {self.gaji_pokok:,.0f}")
        print(f"Pajak ({pajak_persen}%) : Rp {self.gaji_pokok - gaji_bersih:,.0f}")
        print(f"Gaji Bersih : Rp {gaji_bersih:,.0f}")


# --- PROGRAM UTAMA (UJI COBA) ---
if __name__ == "__main__":
    kry1 = Karyawan("Abdul Aziz", "Backend Developer", 6500000)

    print("\n--- Uji Validasi Setter Gaji di Bawah UMR ---")
    kry1.gaji_pokok = 2500000  # Ditolak karena di bawah Rp 3.200.000

    print("\n--- Uji Kenaikan Gaji Valid ---")
    kry1.gaji_pokok = 7500000  # Diterima

    # Cetak slip gaji dengan potongan pajak 5%
    kry1.cetak_slip_gaji(pajak_persen=5.0)
