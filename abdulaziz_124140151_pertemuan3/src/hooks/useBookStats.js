import { useState, useEffect } from 'react';

// Custom Hook 2: useBookStats
// Menghitung statistik koleksi buku berdasarkan status (milik, baca, beli)
function useBookStats(books) {
  const [stats, setStats] = useState({
    total: 0,
    milik: 0,
    baca: 0,
    beli: 0,
    ownedRate: 0,
  });

  useEffect(() => {
    const total = books.length;
    const milik = books.filter((book) => book.status === 'milik').length;
    const baca = books.filter((book) => book.status === 'baca').length;
    const beli = books.filter((book) => book.status === 'beli').length;

    // Menghitung persentase buku yang sudah dimiliki (status 'milik' + 'baca')
    const ownedRate = total > 0 ? Math.round(((milik + baca) / total) * 100) : 0;

    setStats({
      total,
      milik,
      baca,
      beli,
      ownedRate,
    });
  }, [books]);

  return stats;
}

export default useBookStats;
