# ==============================================================================
# Berkas: latihan_kasir.py
# Deskripsi: Latihan Mandiri 1 - Pemodelan Entitas Sistem Kasir Toko Online
# ==============================================================================

"""
CATATAN PEMODELAN ENTITAS SISTEM KASIR TOKO ONLINE:

1. Entitas: Produk
   - Atribut Data:
     1) kode_produk (str)   : Kode unik barang (contoh: "PRD-001")
     2) nama_produk (str)   : Nama barang yang dijual
     3) harga (float)       : Harga satuan barang
     4) stok (int)          : Jumlah ketersediaan barang di gudang
   - Metode Perilaku:
     1) info_produk()       : Menampilkan rincian informasi produk
     2) kurangi_stok(jumlah): Mengurangi stok produk saat dibeli pelanggan

2. Entitas: Keranjang
   - Atribut Data:
     1) pemilik (str)       : Nama pengguna pemilik keranjang belanja
     2) daftar_item (list)  : Daftar produk beserta jumlah yang dimasukkan
     3) kode_voucher (str)  : Kode promo/diskon yang digunakan (opsional)
   - Metode Perilaku:
     1) tambah_produk(produk, jumlah): Memasukkan produk ke dalam keranjang
     2) hitung_total()               : Menghitung total harga seluruh isi keranjang

3. Entitas: Pengguna
   - Atribut Data:
     1) id_pengguna (str)   : ID unik pelanggan
     2) nama (str)          : Nama lengkap pelanggan
     3) saldo (float)       : Saldo dompet digital pelanggan
     4) alamat (str)        : Alamat pengiriman pesanan
   - Metode Perilaku:
     1) isi_saldo(nominal)          : Menambahkan saldo dompet pelanggan
     2) checkout(keranjang)         : Membayar total belanjaan dari keranjang
"""


# ------------------------------------------------------------------------------
# IMPLEMENTASI CLASS SEDERHANA DARI PEMODELAN DI ATAS
# ------------------------------------------------------------------------------
class Produk:
    def __init__(self, kode_produk: str, nama_produk: str, harga: float, stok: int):
        self.kode_produk = kode_produk
        self.nama_produk = nama_produk
        self.harga = harga
        self.stok = stok

    def info_produk(self) -> str:
        return f"[{self.kode_produk}] {self.nama_produk} - Rp {self.harga:,.0f} (Stok: {self.stok})"

    def kurangi_stok(self, jumlah: int) -> bool:
        if 0 < jumlah <= self.stok:
            self.stok -= jumlah
            return True
        print(f"Stok {self.nama_produk} tidak mencukupi!")
        return False


class Keranjang:
    def __init__(self, pemilik: str):
        self.pemilik = pemilik
        self.daftar_item = []  # Menyimpan dictionary {"produk": obj, "jumlah": int}
        self.kode_voucher = None

    def tambah_produk(self, produk: Produk, jumlah: int):
        if produk.kurangi_stok(jumlah):
            self.daftar_item.append({"produk": produk, "jumlah": jumlah})
            print(f"Berhasil menambahkan {jumlah}x {produk.nama_produk} ke keranjang {self.pemilik}.")

    def hitung_total(self) -> float:
        total = 0.0
        for item in self.daftar_item:
            total += item["produk"].harga * item["jumlah"]
        return total


class Pengguna:
    def __init__(self, id_pengguna: str, nama: str, saldo: float, alamat: str):
        self.id_pengguna = id_pengguna
        self.nama = nama
        self.saldo = saldo
        self.alamat = alamat

    def isi_saldo(self, nominal: float):
        if nominal > 0:
            self.saldo += nominal
            print(f"Saldo {self.nama} bertambah Rp {nominal:,.0f}. Total saldo: Rp {self.saldo:,.0f}")

    def checkout(self, keranjang: Keranjang):
        total_tagihan = keranjang.hitung_total()
        print(f"\n--- Proses Checkout ({self.nama}) ---")
        print(f"Alamat Pengiriman : {self.alamat}")
        print(f"Total Belanja     : Rp {total_tagihan:,.0f}")

        if self.saldo >= total_tagihan:
            self.saldo -= total_tagihan
            print(f"Pembayaran Berhasil! Sisa saldo: Rp {self.saldo:,.0f}")
        else:
            print(f"Pembayaran Gagal! Saldo tidak cukup (Saldo: Rp {self.saldo:,.0f}).")


# --- UJI COBA PROGRAM ---
if __name__ == "__main__":
    # 1. Buat beberapa objek Produk
    p1 = Produk("PRD-01", "Keyboard Mechanical", 350000, 10)
    p2 = Produk("PRD-02", "Mouse Wireless", 150000, 15)

    print("=== Daftar Produk Toko ===")
    print(p1.info_produk())
    print(p2.info_produk())
    print()

    # 2. Buat objek Pengguna dan Keranjang
    user = Pengguna("USR-01", "Abdul Aziz", 600000, "Bandar Lampung")
    keranjang_aziz = Keranjang(user.nama)

    # 3. Masukkan produk ke keranjang dan lakukan checkout
    keranjang_aziz.tambah_produk(p1, 1)
    keranjang_aziz.tambah_produk(p2, 1)
    user.checkout(keranjang_aziz)
