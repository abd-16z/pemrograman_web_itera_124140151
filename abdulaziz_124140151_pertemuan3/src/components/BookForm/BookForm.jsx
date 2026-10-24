import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './BookForm.css';

// Komponen form terkontrol (controlled component) untuk menambah dan mengedit buku
function BookForm({ onSubmitBook, editingBook, onCancelEdit }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [status, setStatus] = useState('milik');
  const [errors, setErrors] = useState({});

  // Mengisi otomatis input form jika pengguna menekan tombol Edit pada salah satu buku
  useEffect(() => {
    if (editingBook) {
      setTitle(editingBook.title);
      setAuthor(editingBook.author);
      setStatus(editingBook.status);
      setErrors({});
    } else {
      setTitle('');
      setAuthor('');
      setStatus('milik');
      setErrors({});
    }
  }, [editingBook]);

  // Fungsi validasi input form (error handling kolom wajib isi)
  const validateForm = () => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = 'Judul buku wajib diisi!';
    } else if (title.trim().length < 2) {
      newErrors.title = 'Judul buku minimal 2 karakter!';
    }

    if (!author.trim()) {
      newErrors.author = 'Nama penulis wajib diisi!';
    } else if (author.trim().length < 2) {
      newErrors.author = 'Nama penulis minimal 2 karakter!';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Hentikan proses submit jika validasi gagal
    if (!validateForm()) return;

    const bookData = {
      id: editingBook ? editingBook.id : Date.now(),
      title: title.trim(),
      author: author.trim(),
      status: status,
    };

    onSubmitBook(bookData);

    // Reset form setelah berhasil tambah buku
    if (!editingBook) {
      setTitle('');
      setAuthor('');
      setStatus('milik');
      setErrors({});
    }
  };

  return (
    <form className="book-form" onSubmit={handleSubmit} noValidate>
      <fieldset>
        <legend>{editingBook ? 'Edit Data Buku' : 'Tambah Buku Baru'}</legend>

        <div className="form-group">
          <label htmlFor="book-title">Judul Buku</label>
          <input
            id="book-title"
            type="text"
            placeholder="Tulis judul buku disini"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (errors.title) setErrors({ ...errors, title: '' });
            }}
            className={errors.title ? 'input-error' : ''}
          />
          {errors.title && <small className="error-text">{errors.title}</small>}
        </div>

        <div className="form-group">
          <label htmlFor="book-author">Nama Penulis</label>
          <input
            id="book-author"
            type="text"
            placeholder="Tulis nama penulis disini"
            value={author}
            onChange={(e) => {
              setAuthor(e.target.value);
              if (errors.author) setErrors({ ...errors, author: '' });
            }}
            className={errors.author ? 'input-error' : ''}
          />
          {errors.author && <small className="error-text">{errors.author}</small>}
        </div>

        <div className="form-group">
          <label htmlFor="book-status">Status Buku</label>
          <select
            id="book-status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="milik">Sudah Dimiliki (Milik)</option>
            <option value="baca">Sedang Dibaca (Baca)</option>
            <option value="beli">Ingin Dibeli (Beli)</option>
          </select>
        </div>

        <div className="form-actions">
          <button id="btn-daftar" type="submit" className="submit-btn">
            {editingBook ? 'Simpan Perubahan' : 'Tambah Buku'}
          </button>

          {editingBook && (
            <button
              type="button"
              className="tombol cancel-btn"
              onClick={onCancelEdit}
            >
              Batal Edit
            </button>
          )}
        </div>
      </fieldset>
    </form>
  );
}

BookForm.propTypes = {
  onSubmitBook: PropTypes.func.isRequired,
  editingBook: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['milik', 'baca', 'beli']).isRequired,
  }),
  onCancelEdit: PropTypes.func,
};

export default BookForm;
