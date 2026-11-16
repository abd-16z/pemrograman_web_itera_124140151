# ==============================================================================
# Berkas: main.py
# Deskripsi: Program utama untuk menguji Sistem Manajemen Perpustakaan Sederhana
# ==============================================================================

from library_item import Book, Magazine
from member import Member
from library import Library


def main():
    print("=" * 78)
    print("        SISTEM MANAJEMEN PERPUSTAKAAN SEDERHANA - ITERA")
    print("=" * 78)

    # 1. Membuat objek Perpustakaan
    perpus = Library("Perpustakaan Pusat ITERA")

    # 2. Membuat beberapa objek Book dan Magazine (Inheritance dari LibraryItem)
    print("\n--- 1. Menambahkan Koleksi Buku dan Majalah ---")
    buku1 = Book("BK-001", "Clean Architecture", 2017, "Robert C. Martin", 432)
    buku2 = Book("BK-002", "Pemrograman Web dengan Python", 2024, "Tim Dosen PAW", 280)
    buku3 = Book("BK-003", "Algoritma dan Struktur Data", 2022, "Rinaldi Munir", 510)

    majalah1 = Magazine("MG-001", "National Geographic Indonesia", 2025, "Kompas Gramedia", "Edisi Mei")
    majalah2 = Magazine("MG-002", "InfoKomputer Tech", 2025, "Grid Network", "Vol. 18")

    # Menambahkan seluruh item ke dalam perpustakaan
    for item in [buku1, buku2, buku3, majalah1, majalah2]:
        perpus.tambah_item(item)

    # 3. Menampilkan daftar item yang tersedia (Polymorphism pada get_detail)
    perpus.tampilkan_item_tersedia()

    # 4. Mencari item berdasarkan ID dan berdasarkan Judul
    print("\n--- 2. Pengujian Fitur Pencarian Item (Berdasarkan ID & Judul) ---")
    perpus.cari_item("BK-002")          # Cari berdasarkan ID
    perpus.cari_item("geographic")      # Cari berdasarkan potongan Judul
    perpus.cari_item("BK-999")          # Cari item yang tidak ada

    # 5. Demonstrasi Peminjaman & Pengembalian oleh Anggota (Encapsulation & Property)
    print("\n--- 3. Simulasi Peminjaman & Pengembalian Koleksi ---")
    anggota1 = Member("MBR-151", "Abdul Aziz")

    anggota1.pinjam(buku2)
    anggota1.pinjam(majalah1)
    anggota1.pinjam(buku2)  # Uji pinjam ulang item yang sedang dipinjam

    anggota1.tampilkan_pinjaman()

    # Menampilkan daftar item yang tersedia setelah 2 item dipinjam
    perpus.tampilkan_item_tersedia()

    # Mengembalikan item (1 tepat waktu, 1 terlambat 3 hari untuk uji hitung_denda polimorfik)
    print("\n--- 4. Pengembalian Item & Perhitungan Denda Polimorfik ---")
    anggota1.kembalikan(buku2, hari_terlambat=3)     # Denda buku: 3 x Rp 2.000 = Rp 6.000
    anggota1.kembalikan(majalah1, hari_terlambat=3)  # Denda majalah: 3 x Rp 1.000 = Rp 3.000

    # Menampilkan seluruh katalog akhir
    perpus.tampilkan_semua_koleksi()


if __name__ == "__main__":
    main()
