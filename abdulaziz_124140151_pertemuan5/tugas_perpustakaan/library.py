# ==============================================================================
# Berkas: library.py
# Deskripsi: Class Library untuk menyimpan dan mengelola koleksi perpustakaan
# ==============================================================================

from library_item import LibraryItem


class Library:
    """
    Class Library untuk mengelola koleksi item perpustakaan.
    Menerapkan encapsulation dengan menyimpan daftar item di atribut private __koleksi.
    """

    def __init__(self, nama_perpustakaan: str):
        self.nama_perpustakaan = nama_perpustakaan
        # Private attribute: koleksi hanya boleh dimodifikasi lewat method resmi
        self.__koleksi: list[LibraryItem] = []

    @property
    def total_koleksi(self) -> int:
        """Property untuk menghitung total seluruh item yang terdaftar"""
        return len(self.__koleksi)

    def tambah_item(self, item: LibraryItem):
        """Menambahkan objek turunan LibraryItem (Book / Magazine) ke perpustakaan"""
        if not isinstance(item, LibraryItem):
            raise TypeError("Objek yang ditambahkan harus merupakan turunan dari LibraryItem!")

        self.__koleksi.append(item)
        print(f"[TAMBAH] Berhasil menambahkan '{item.judul}' (ID: {item.item_id}) ke {self.nama_perpustakaan}.")

    def tampilkan_item_tersedia(self):
        """Menampilkan seluruh daftar item yang saat ini berstatus Tersedia (belum dipinjam)"""
        print(f"\n=== DAFTAR ITEM TERSEDIA DI {self.nama_perpustakaan.upper()} ===")
        item_tersedia = [item for item in self.__koleksi if not item.is_dipinjam]

        if not item_tersedia:
            print("Belum ada item yang tersedia saat ini.")
            return

        for nomor, item in enumerate(item_tersedia, start=1):
            # Panggilan polimorfik ke method get_detail() milik Book atau Magazine
            print(f"{nomor}. {item.get_detail()}")
        print(f"Total tersedia: {len(item_tersedia)} dari {self.total_koleksi} item.")

    def tampilkan_semua_koleksi(self):
        """Menampilkan seluruh katalog item baik yang tersedia maupun sedang dipinjam"""
        print(f"\n=== SELURUH KATALOG {self.nama_perpustakaan.upper()} ===")
        if not self.__koleksi:
            print("Koleksi perpustakaan masih kosong.")
            return

        for nomor, item in enumerate(self.__koleksi, start=1):
            print(f"{nomor}. {item.get_detail()}")

    def cari_item(self, kata_kunci: str) -> list[LibraryItem]:
        """
        Mencari item perpustakaan berdasarkan kecocokan ID atau Judul (case-insensitive).
        Mengembalikan list berisi item yang cocok.
        """
        keyword = kata_kunci.strip().lower()
        hasil_pencarian = [
            item for item in self.__koleksi
            if keyword == item.item_id.lower() or keyword in item.judul.lower()
        ]

        print(f"\n=== HASIL PENCARIAN KATA KUNCI: '{kata_kunci}' ===")
        if hasil_pencarian:
            for item in hasil_pencarian:
                print(f" -> Ditemukan: {item.get_detail()}")
        else:
            print(f" -> Item dengan judul atau ID '{kata_kunci}' tidak ditemukan.")

        return hasil_pencarian
