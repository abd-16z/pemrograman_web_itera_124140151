# ==============================================================================
# Berkas: library_item.py
# Deskripsi: Abstract Class LibraryItem beserta Subclass Book dan Magazine
# ==============================================================================

from abc import ABC, abstractmethod


class LibraryItem(ABC):
    """
    Abstract Base Class yang menjadi cetak biru dasar untuk seluruh item
    koleksi di perpustakaan (Buku, Majalah, dll).
    """

    def __init__(self, item_id: str, judul: str, tahun_terbit: int):
        # Protected attributes: dapat diakses oleh class ini dan subclass turunannya
        self._item_id = item_id
        self._judul = judul
        self._tahun_terbit = tahun_terbit

        # Private attribute: status peminjaman dilindungi dengan name mangling
        self.__is_dipinjam = False

    # --------------------------------------------------------------------------
    # PROPERTY DECORATOR (Getter & Setter untuk Encapsulation)
    # --------------------------------------------------------------------------
    @property
    def item_id(self) -> str:
        """Getter untuk membaca ID unik item perpustakaan"""
        return self._item_id

    @property
    def judul(self) -> str:
        """Getter untuk membaca judul item perpustakaan"""
        return self._judul

    @property
    def is_dipinjam(self) -> bool:
        """Getter untuk memeriksa apakah item sedang dipinjam"""
        return self.__is_dipinjam

    @is_dipinjam.setter
    def is_dipinjam(self, status_baru: bool):
        """Setter untuk mengubah status peminjaman dengan validasi tipe boolean"""
        if not isinstance(status_baru, bool):
            raise TypeError("Status peminjaman harus berupa nilai boolean (True/False)!")
        self.__is_dipinjam = status_baru

    @property
    def status_teks(self) -> str:
        """Mengembalikan teks status ketersediaan item"""
        return "Dipinjam" if self.__is_dipinjam else "Tersedia"

    # --------------------------------------------------------------------------
    # ABSTRACT METHODS (Wajib di-override oleh setiap Subclass)
    # --------------------------------------------------------------------------
    @abstractmethod
    def get_detail(self) -> str:
        """Mengembalikan rincian informasi spesifik dari masing-masing jenis item"""
        pass

    @abstractmethod
    def hitung_denda(self, hari_terlambat: int) -> float:
        """Menghitung besaran denda keterlambatan pengembalian item"""
        pass


class Book(LibraryItem):
    """
    Subclass Book (Buku) yang mewarisi dari LibraryItem.
    Memiliki atribut tambahan penulis dan jumlah_halaman.
    """

    def __init__(self, item_id: str, judul: str, tahun_terbit: int, penulis: str, jumlah_halaman: int):
        super().__init__(item_id, judul, tahun_terbit)
        self.penulis = penulis
        self.jumlah_halaman = jumlah_halaman

    # Implementasi method abstract get_detail() (Polymorphism)
    def get_detail(self) -> str:
        return (
            f"[BUKU]    ID: {self._item_id} | '{self._judul}' ({self._tahun_terbit}) | "
            f"Penulis: {self.penulis} | {self.jumlah_halaman} hlm | Status: {self.status_teks}"
        )

    # Implementasi method abstract hitung_denda() (Denda buku: Rp 2.000 / hari)
    def hitung_denda(self, hari_terlambat: int) -> float:
        if hari_terlambat <= 0:
            return 0.0
        tarif_per_hari = 2000.0
        return hari_terlambat * tarif_per_hari


class Magazine(LibraryItem):
    """
    Subclass Magazine (Majalah) yang mewarisi dari LibraryItem.
    Memiliki atribut tambahan penerbit dan edisi.
    """

    def __init__(self, item_id: str, judul: str, tahun_terbit: int, penerbit: str, edisi: str):
        super().__init__(item_id, judul, tahun_terbit)
        self.penerbit = penerbit
        self.edisi = edisi

    # Implementasi method abstract get_detail() (Polymorphism)
    def get_detail(self) -> str:
        return (
            f"[MAJALAH] ID: {self._item_id} | '{self._judul}' ({self._tahun_terbit}) | "
            f"Penerbit: {self.penerbit} | Edisi: {self.edisi} | Status: {self.status_teks}"
        )

    # Implementasi method abstract hitung_denda() (Denda majalah: Rp 1.000 / hari)
    def hitung_denda(self, hari_terlambat: int) -> float:
        if hari_terlambat <= 0:
            return 0.0
        tarif_per_hari = 1000.0
        return hari_terlambat * tarif_per_hari
