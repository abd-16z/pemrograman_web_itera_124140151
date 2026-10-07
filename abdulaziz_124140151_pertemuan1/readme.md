# Tugas Praktikum PAW - Pertemuan 1

## Identitas
- **Nama:** Abdul Aziz
- **NIM:** 124140151
- **Kelas Praktikum:** RB

---

## Deskripsi Aplikasi
Aplikasi **Mini POS (Point of Sale) / Kasir Sederhana** dibuat untuk mengelola transaksi kantin/toko kampus. Aplikasi ini memfasilitasi pencatatan belanja barang, validasi input form secara otomatis, kalkulasi diskon, pembayaran dan kembalian, serta menyimpan daftar keranjang belanja di browser menggunakan `localStorage`.

---

## Panduan Menjalankan Aplikasi
1. Clone atau download repository ini.
2. Buka folder proyek menggunakan VS Code.
3. Jalankan file `index.html` menggunakan ekstensi **Live Server** di VS Code atau cukup klik ganda file `index.html` untuk memukanya langsung di web browser.

---

## Checklist Fitur Utama
- [x] **Validasi Form:**
  - Nama barang minimal 3 karakter.
  - Harga satuan minimal Rp 500 & angka positif.
  - Qty berupa angka bulat minimal 1.
  - Pesan teks error berwarna merah jika input tidak valid.
- [x] **Kalkulator Otomatis:**
  - Hitung subtotal per baris (`Harga x Qty`).
  - Akumulasi total belanja.
  - Diskon otomatis 10% jika total belanja &ge; Rp 50.000.
  - Kalkulator uang bayar dan kembalian otomatis dengan notifikasi jika uang kurang.
- [x] **Penyimpanan LocalStorage & Aksi:**
  - Menampilkan keranjang belanja dalam bentuk tabel interaktif.
  - Fitur hapus per baris item.
  - Data tersimpan persisten via `localStorage` (JSON.stringify & JSON.parse).
  - Tombol reset/transaksi baru untuk membersihkan keranjang dan `localStorage`.

---

## Tangkapan Layar (Screenshot)
1. **Tampilan Form Utama & Keranjang:** <img width="1917" height="957" alt="image" src="https://github.com/user-attachments/assets/3e437688-7254-42d0-b8e2-5c3c0456e84d" />
2. **Pesan Validasi Error:** <img width="457" height="627" alt="image" src="https://github.com/user-attachments/assets/135c7894-d4ad-4f27-8ba1-9151d226e768" />
3. **Kalkulasi Diskon & Kembalian:** <img width="893" height="690" alt="image" src="https://github.com/user-attachments/assets/2cfc8e65-4f4e-4600-9df4-09a6020f95b2" />

---

## Penjelasan Teknis Singkat
1. **Validasi Input:** Fungsi `validasiForm()` melakukan pengecekan `length`, `isNaN`, dan kondisi batas minimum pada nilai input sebelum dimasukkan ke dalam *array* state `cart`.
2. **Kalkulator:** Metode `.reduce()` dan manipulasi matematika digunakan untuk mengalkulasikan subtotal, total akhir, diskon 10%, serta kembalian pada event `input`.
3. **Serialisasi LocalStorage:** Setiap terjadi perubahan pada *array* `cart` (penambahan/penghapusan), state langsung disimpan ke browser menggunakan `localStorage.setItem('cart', JSON.stringify(cart))` dan dibaca kembali saat halaman dimuat ulang.
