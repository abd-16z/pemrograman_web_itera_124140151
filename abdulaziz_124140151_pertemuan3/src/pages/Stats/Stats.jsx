import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { useBooks } from '../../context/BookContext';
import './Stats.css';

function Stats() {
  // Mengambil daftar buku dan statistik yang dihitung oleh custom hook useBookStats
  const { books, stats } = useBooks();

  return (
    <div className="stats-page">
      <Header
        title="Statistik Koleksi Buku"
        description="Ringkasan data buku pribadi yang tersimpan di localStorage"
      />

      <main className="container">
        <div className="stats-card">
          <div className="catatan">
            Halaman ini menampilkan rekapitulasi buku yang dihitung secara otomatis
            menggunakan custom hook <code>useBookStats</code> dan{' '}
            <code>useLocalStorage</code> pada <strong>Context API</strong>.
          </div>

          <table>
            <caption>Ringkasan Koleksi Buku</caption>
            <tbody>
              <tr>
                <th>Total Buku</th>
                <td><strong>{stats.total}</strong> buku</td>
              </tr>
              <tr>
                <th>Sudah Dimiliki (Milik)</th>
                <td><strong>{stats.milik}</strong> buku</td>
              </tr>
              <tr>
                <th>Sedang Dibaca (Baca)</th>
                <td><strong>{stats.baca}</strong> buku</td>
              </tr>
              <tr>
                <th>Ingin Dibeli (Beli)</th>
                <td><strong>{stats.beli}</strong> buku</td>
              </tr>
              <tr>
                <th>Persentase Dimiliki &amp; Dibaca</th>
                <td><strong>{stats.ownedRate}%</strong></td>
              </tr>
            </tbody>
          </table>

          <table>
            <caption>Daftar Buku Terakhir Ditambahkan</caption>
            <thead>
              <tr>
                <th>Judul Buku</th>
                <th>Penulis</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {books.length === 0 ? (
                <tr>
                  <td colSpan="3">Belum ada data buku yang tercatat.</td>
                </tr>
              ) : (
                books.slice(-5).reverse().map((book) => (
                  <tr key={book.id}>
                    <td><strong>{book.title}</strong></td>
                    <td>{book.author}</td>
                    <td><code>{book.status.toUpperCase()}</code></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <Link to="/" className="tombol">
            Kembali ke Daftar Buku
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Stats;
