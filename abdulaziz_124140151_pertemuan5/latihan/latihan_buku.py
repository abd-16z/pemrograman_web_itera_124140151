# ==============================================================================
# Berkas: latihan_buku.py
# Deskripsi: Latihan Mandiri 2 - Class Buku dengan Diskon & Dunder Length
# ==============================================================================

class Buku:
    def __init__(self, judul: str, penulis: str, harga_asli: float, jumlah_halaman: int):
        self.judul = judul
        self.penulis = penulis
        self.harga_asli = harga_asli
        self.jumlah_halaman = jumlah_halaman

    def hitung_harga_diskon(self, persen: float) -> float:
        """Menghitung dan mengembalikan harga buku setelah potongan diskon (%)"""
        if not (0 <= persen <= 100):
            print("Persentase diskon harus berada di antara 0% hingga 100%!")
            return self.harga_asli
        potongan = self.harga_asli * (persen / 100)
        return self.harga_asli - potongan

    def __str__(self) -> str:
        """Mencetak informasi kartu buku yang rapi saat print(buku) dipanggil"""
        return (
            f"Buku: '{self.judul}' oleh {self.penulis} | "
            f"Halaman: {self.jumlah_halaman} hlm | "
            f"Harga: Rp {self.harga_asli:,.0f}"
        )

    def __len__(self) -> int:
        """Mengembalikan jumlah_halaman ketika fungsi len(buku) dipanggil"""
        return self.jumlah_halaman


# --- PROGRAM UTAMA (UJI COBA) ---
if __name__ == "__main__":
    buku1 = Buku("Clean Code", "Robert C. Martin", 250000, 464)
    buku2 = Buku(" Belajar Python OOP", "Tim Dosen ITERA", 120000, 210)
    buku2.judul = buku2.judul.strip()

    print("--- Informasi Kartu Buku (__str__) ---")
    print(buku1)
    print(buku2)

    print("\n--- Uji Dunder Method __len__ ---")
    print(f"Jumlah halaman '{buku1.judul}' : {len(buku1)} halaman")
    print(f"Jumlah halaman '{buku2.judul}' : {len(buku2)} halaman")

    print("\n--- Uji Perhitungan Harga Diskon ---")
    diskon = 20
    harga_promo = buku1.hitung_harga_diskon(diskon)
    print(f"Harga asli '{buku1.judul}'   : Rp {buku1.harga_asli:,.0f}")
    print(f"Harga setelah diskon {diskon}%     : Rp {harga_promo:,.0f}")
