# Tugas Praktikum 3: Aplikasi Manajemen Buku Pribadi (Koleksi BukuKu)
**Mata Kuliah:** Praktikum Pengembangan Aplikasi Web (PAW)  
**Topik:** Konsep Dasar React  

---

## 👤 Identitas Mahasiswa
- **Nama Lengkap:** [NAMA LENGKAP MAHASISWA]
- **NIM:** [NIM MAHASISWA]
- **Kelas Praktikum:** [RA / RB]
- **Tautan Repositori GitHub:** `https://github.com/[USERNAME_GITHUB]/pemrograman_web_itera_[NIM]`

---

## 📖 Deskripsi Aplikasi
**Koleksi BukuKu** adalah aplikasi manajemen buku pribadi berbasis **React** yang membantu pengguna mencatat dan mengelola daftar buku yang sudah dimiliki (`milik`), sedang dibaca (`baca`), maupun buku yang ingin dibeli (`beli`).

Aplikasi ini dibangun menggunakan konsep dasar React sesuai materi modul praktikum, meliputi:
1. **Component-Based Architecture & Props Validation (`PropTypes`):** Memecah antarmuka menjadi komponen-komponen *reusable* (`Header`, `Navbar`, `BookForm`, `BookFilter`, dan `BookList`).
2. **State Management & React Hooks (`useState` & `useEffect`):** Mengelola form terkontrol (*controlled component*), validasi input secara interaktif, dan sinkronisasi data.
3. **Custom Hooks (`useLocalStorage` & `useBookStats`):** Memisahkan logika penyimpanan `localStorage` dan perhitungan statistik buku dari komponen tampilan.
4. **Global State dengan Context API (`BookContext`):** Menyediakan state dan fungsi manipulasi buku (tambah, edit, hapus, filter, cari) ke seluruh halaman tanpa *prop drilling*.
5. **Single Page Application (SPA) dengan React Router:** Navigasi instan antar halaman **Daftar Buku (`/`)**, **Statistik (`/stats`)**, dan **Halaman 404 (`*`)** tanpa *reload* browser.

---

## 🚀 Instruksi Instalasi dan Cara Menjalankan Aplikasi

### Prasyarat
Pastikan **Node.js** (v18+ atau v20+) dan **npm** sudah terpasang di komputer Anda.

### Langkah-langkah Menjalankan Project Tugas:
1. **Masuk ke direktori project:**
   ```bash
   cd tugas_pertemuan3
   ```
2. **Pasang seluruh paket dependensi:**
   ```bash
   npm install
   ```
3. **Jalankan development server:**
   ```bash
   npm run dev
   ```
4. **Buka di browser:**
   Akses alamat lokal yang muncul di terminal (biasanya `http://localhost:5173`).

### Menjalankan Unit Testing (Vitest & React Testing Library):
```bash
npm test
```

---

## ✅ Daftar Fitur & Persyaratan yang Diimplementasikan

### 1. Fitur Dasar
- [x] **Menambah Buku Baru:** Input judul buku, nama penulis, dan pilihan status (`milik`, `baca`, `beli`).
- [x] **Mengedit & Menghapus Buku:** Tombol **Edit** memuat data buku ke form untuk diperbarui, dan tombol **Hapus** menghapus buku dari daftar.
- [x] **Filter Buku Berdasarkan Status:** Filter cepat untuk menampilkan `Semua Buku`, `Dimiliki`, `Sedang Dibaca`, atau `Ingin Dibeli`.
- [x] **Pencarian Buku Real-time:** Mencari buku berdasarkan kata kunci pada judul buku atau nama penulis.
- [x] **Validasi & Error Handling Form:** Menampilkan pesan peringatan berwarna merah jika kolom judul atau penulis dikosongkan atau kurang dari 2 karakter.

### 2. Fitur Teknologi React
- [x] **Functional Components & Hooks:** Menggunakan `useState` dan `useEffect` di seluruh komponen.
- [x] **Komponen Reusable dengan `PropTypes`:**
  - `Header.jsx`: Menampilkan judul dan deskripsi halaman.
  - `Navbar.jsx`: Navigasi antar halaman menggunakan `<Link>`.
  - `BookForm.jsx`: Form input tambah & edit buku dengan validasi.
  - `BookFilter.jsx`: Bar pencarian dan tombol filter status.
  - `BookList.jsx`: Menampilkan daftar kartu buku beserta badge status dan tombol aksi.
- [x] **2 Custom Hooks:**
  - `src/hooks/useLocalStorage.js`: Menyimpan dan memuat state dari `localStorage` dengan *error handling* `try...catch`.
  - `src/hooks/useBookStats.js`: Menghitung total buku, jumlah per kategori (`milik`, `baca`, `beli`), serta persentase kepemilikan buku.
- [x] **Context API (`src/context/BookContext.jsx`):** Mengelola state global menggunakan `BookProvider` dan custom hook `useBooks()`.
- [x] **React Router (`react-router-dom`):** Navigasi multi-halaman (`Home`, `Stats`, dan `NotFound`).
- [x] **6 Unit Tests (`BookList.test.jsx` & `BookForm.test.jsx`):** Menguji render daftar buku, pesan kosong, aksi klik Edit, aksi klik Hapus, validasi error form kosong, dan submit form valid.

---

## 📸 Screenshot Antarmuka & Laporan Testing

> *Simpan hasil tangkapan layar aplikasi pada folder `screenshots/` saat pengumpulan.*

### 1. Halaman Utama (Daftar Buku, Form, & Filter)
![Halaman Utama](screenshots/halaman_utama.png)

### 2. Validasi Form Input (Error Handling)
![Validasi Form](screenshots/validasi_form.png)

### 3. Halaman Statistik Koleksi Buku (`/stats`)
![Halaman Statistik](screenshots/halaman_statistik.png)

### 4. Laporan Hasil Eksekusi Unit Test di Terminal
![Hasil Unit Test](screenshots/hasil_unit_test.png)

Contoh output eksekusi `npm test`:
```text
 ✓ src/components/BookList/BookList.test.jsx (4 tests) 32ms
   ✓ Komponen BookList > merender daftar judul dan penulis buku dengan benar
   ✓ Komponen BookList > menampilkan pesan kosong jika belum ada data buku
   ✓ Komponen BookList > memanggil fungsi onEdit saat tombol Edit diklik
   ✓ Komponen BookList > memanggil fungsi onDelete saat tombol Hapus diklik
 ✓ src/components/BookForm/BookForm.test.jsx (2 tests) 29ms
   ✓ Komponen BookForm > menampilkan pesan error validasi ketika form disubmit dalam keadaan kosong
   ✓ Komponen BookForm > memanggil fungsi onSubmitBook saat form diisi dengan benar

 Test Files  2 passed (2)
      Tests  6 passed (6)
```

---

## 📂 Struktur Folder Project
```text
tugas_pertemuan3/
├── index.html
├── package.json
├── vite.config.js
├── README.md
├── src/
│   ├── components/
│   │   ├── Header/
│   │   │   ├── Header.jsx
│   │   │   └── Header.css
│   │   ├── Navbar/
│   │   │   ├── Navbar.jsx
│   │   │   └── Navbar.css
│   │   ├── BookForm/
│   │   │   ├── BookForm.jsx
│   │   │   ├── BookForm.css
│   │   │   └── BookForm.test.jsx
│   │   ├── BookFilter/
│   │   │   ├── BookFilter.jsx
│   │   │   └── BookFilter.css
│   │   └── BookList/
│   │       ├── BookList.jsx
│   │       ├── BookList.css
│   │       └── BookList.test.jsx
│   ├── pages/
│   │   ├── Home/
│   │   │   ├── Home.jsx
│   │   │   └── Home.css
│   │   ├── Stats/
│   │   │   ├── Stats.jsx
│   │   │   └── Stats.css
│   │   └── NotFound/
│   │       ├── NotFound.jsx
│   │       └── NotFound.css
│   ├── hooks/
│   │   ├── useLocalStorage.js
│   │   └── useBookStats.js
│   ├── context/
│   │   └── BookContext.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── setupTests.js
└── modul_latihan/               # Bagian latihan modul & 6 Latihan Mandiri
    ├── praktik-cepat-cdn/
    │   └── index.html
    └── my-react-app/
```
