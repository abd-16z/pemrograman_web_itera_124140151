# ==============================================================================
# Berkas: member.py
# Deskripsi: Class Member untuk mengelola data anggota dan pinjaman perpustakaan
# ==============================================================================

from library_item import LibraryItem


class Member:
    """
    Class untuk merepresentasikan anggota perpustakaan beserta daftar item
    yang sedang dipinjam oleh anggota tersebut.
    """

    def __init__(self, member_id: str, nama: str):
        self.member_id = member_id
        self.nama = nama
        # Private attribute: melindungi daftar pinjaman dari modifikasi langsung
        self.__item_dipinjam: list[LibraryItem] = []

    @property
    def jumlah_pinjaman(self) -> int:
        """Property untuk melihat jumlah item yang sedang dipinjam anggota"""
        return len(self.__item_dipinjam)

    def pinjam(self, item: LibraryItem) -> bool:
        """Meminjam item dari perpustakaan jika item sedang tersedia"""
        if item.is_dipinjam:
            print(f"[GAGAL] '{item.judul}' sedang dipinjam oleh anggota lain.")
            return False

        item.is_dipinjam = True
        self.__item_dipinjam.append(item)
        print(f"[PINJAM] {self.nama} ({self.member_id}) berhasil meminjam: '{item.judul}'")
        return True

    def kembalikan(self, item: LibraryItem, hari_terlambat: int = 0) -> bool:
        """Mengembalikan item ke perpustakaan dan menghitung denda jika terlambat"""
        if item not in self.__item_dipinjam:
            print(f"[GAGAL] {self.nama} tidak sedang meminjam '{item.judul}'.")
            return False

        item.is_dipinjam = False
        self.__item_dipinjam.remove(item)
        denda = item.hitung_denda(hari_terlambat)

        if denda > 0:
            print(
                f"[KEMBALI] {self.nama} mengembalikan '{item.judul}' "
                f"(Terlambat {hari_terlambat} hari | Denda: Rp {denda:,.0f})"
            )
        else:
            print(f"[KEMBALI] {self.nama} mengembalikan '{item.judul}' tepat waktu (Tanpa Denda).")
        return True

    def tampilkan_pinjaman(self):
        """Menampilkan daftar item yang sedang dipinjam oleh anggota ini"""
        print(f"\nDaftar Pinjaman Anggota: {self.nama} (ID: {self.member_id})")
        if not self.__item_dipinjam:
            print(" - Tidak ada item yang sedang dipinjam.")
            return

        for idx, item in enumerate(self.__item_dipinjam, start=1):
            print(f" {idx}. {item.get_detail()}")
