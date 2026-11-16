# ==============================================================================
# Berkas: latihan_storage.py
# Deskripsi: Latihan Mandiri 6 - Interface File Storage Service (Abstract Class)
# ==============================================================================

from abc import ABC, abstractmethod


# 1. ABSTRACT BASE CLASS: FILE STORAGE
class FileStorage(ABC):
    @abstractmethod
    def upload_file(self, nama_file: str, data_bytes: bytes) -> bool:
        """Kontrak method untuk mengunggah/menyimpan berkas"""
        pass

    @abstractmethod
    def download_file(self, nama_file: str) -> bytes:
        """Kontrak method untuk mengunduh/membaca berkas"""
        pass


# 2. CONCRETE CLASS 1: LOCAL DISK STORAGE
class LocalDiskStorage(FileStorage):
    def __init__(self, folder_lokal: str = "C:/storage_lokal"):
        self.folder_lokal = folder_lokal
        self._penyimpanan = {}  # Simulasi penyimpanan di memori lokal

    def upload_file(self, nama_file: str, data_bytes: bytes) -> bool:
        self._penyimpanan[nama_file] = data_bytes
        ukuran = len(data_bytes)
        print(f"[LocalDisk] Berkas '{nama_file}' ({ukuran} bytes) disimpan di '{self.folder_lokal}/{nama_file}'.")
        return True

    def download_file(self, nama_file: str) -> bytes:
        if nama_file in self._penyimpanan:
            print(f"[LocalDisk] Membaca berkas '{nama_file}' dari '{self.folder_lokal}'...")
            return self._penyimpanan[nama_file]
        print(f"[LocalDisk] Error: Berkas '{nama_file}' tidak ditemukan di disk lokal!")
        return b""


# 3. CONCRETE CLASS 2: CLOUD STORAGE
class CloudStorage(FileStorage):
    def __init__(self, bucket_name: str = "itera-cloud-bucket"):
        self.bucket_name = bucket_name
        self._cloud_server = {}  # Simulasi penyimpanan di server cloud

    def upload_file(self, nama_file: str, data_bytes: bytes) -> bool:
        self._cloud_server[nama_file] = data_bytes
        ukuran = len(data_bytes)
        print(f"[CloudStorage] Mengunggah '{nama_file}' ({ukuran} bytes) ke bucket 's3://{self.bucket_name}/{nama_file}' [OK].")
        return True

    def download_file(self, nama_file: str) -> bytes:
        if nama_file in self._cloud_server:
            print(f"[CloudStorage] Mengunduh '{nama_file}' dari bucket 's3://{self.bucket_name}'...")
            return self._cloud_server[nama_file]
        print(f"[CloudStorage] Error: Objek '{nama_file}' tidak ditemukan di server cloud!")
        return b""


# --- PROGRAM UTAMA (UJI COBA) ---
if __name__ == "__main__":
    data_contoh = b"Laporan Praktikum Pemrograman Web Pertemuan 5 - OOP Python"

    print("--- 1. Uji Coba LocalDiskStorage ---")
    lokal = LocalDiskStorage("D:/Data_Praktikum")
    lokal.upload_file("laporan_p5.txt", data_contoh)
    hasil_lokal = lokal.download_file("laporan_p5.txt")
    print("Isi Berkas:", hasil_lokal.decode("utf-8"))

    print("\n--- 2. Uji Coba CloudStorage ---")
    cloud = CloudStorage("paw-itera-storage")
    cloud.upload_file("backup_laporan.txt", data_contoh)
    hasil_cloud = cloud.download_file("backup_laporan.txt")
    print("Isi Berkas:", hasil_cloud.decode("utf-8"))
