import React from 'react';
import PropTypes from 'prop-types';
import './BookList.css';

// Helper untuk mengubah nilai status menjadi label yang mudah dibaca
function getStatusLabel(status) {
  switch (status) {
    case 'milik':
      return 'Sudah Dimiliki';
    case 'baca':
      return 'Sedang Dibaca';
    case 'beli':
      return 'Ingin Dibeli';
    default:
      return status;
  }
}

// Komponen untuk merender daftar buku beserta tombol aksi Edit dan Hapus
function BookList({ books, onEdit, onDelete }) {
  if (books.length === 0) {
    return (
      <div className="catatan empty-books">
        <p>Belum ada buku yang sesuai. Silakan tambahkan buku baru pada form di atas!</p>
      </div>
    );
  }

  return (
    <div className="book-list">
      <table>
        <caption>Daftar Koleksi Buku</caption>
        <thead>
          <tr>
            <th>Informasi Buku</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id} className="book-item">
              <td>
                <div className="book-info">
                  <strong className="book-title">{book.title}</strong>
                  <span className="book-author">Penulis: {book.author}</span>
                </div>
              </td>
              <td>
                <span className={`status-badge status-${book.status}`}>
                  {getStatusLabel(book.status)}
                </span>
              </td>
              <td>
                <div className="book-actions">
                  <button
                    type="button"
                    className="edit-btn"
                    onClick={() => onEdit(book)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => onDelete(book.id)}
                  >
                    Hapus
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

BookList.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      status: PropTypes.oneOf(['milik', 'baca', 'beli']).isRequired,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default BookList;
