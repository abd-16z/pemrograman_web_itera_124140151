import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import './NotFound.css';

function NotFound() {
  return (
    <div className="not-found">
      <Header
        title="404 - Halaman Tidak Ditemukan"
        description="Halaman yang Anda cari tidak tersedia di aplikasi ini"
      />
      <main className="container">
        <div className="not-found-card">
          <div className="catatan">
            Maaf, alamat URL yang Anda akses tidak ditemukan. Silakan kembali ke halaman utama.
          </div>
          <Link to="/" className="tombol home-link-btn">
            Kembali ke Daftar Buku
          </Link>
        </div>
      </main>
    </div>
  );
}

export default NotFound;
