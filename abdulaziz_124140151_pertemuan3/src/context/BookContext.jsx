import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import useLocalStorage from '../hooks/useLocalStorage';
import useBookStats from '../hooks/useBookStats';

// Membuat wadah Context untuk manajemen data buku global
const BookContext = createContext();

// Custom consumer hook agar komponen dapat langsung memanggil useBooks()
export function useBooks() {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks harus digunakan di dalam BookProvider');
  }
  return context;
}

export function BookProvider({ children }) {
  // Menyimpan daftar buku secara persisten di localStorage dengan key 'books_data'
  const [books, setBooks] = useLocalStorage('books_data', []);

  // State untuk buku yang sedang dalam mode edit (null jika tidak ada)
  const [editingBook, setEditingBook] = useState(null);

  // State untuk filter status ('semua', 'milik', 'baca', 'beli') dan kata kunci pencarian
  const [filterStatus, setFilterStatus] = useState('semua');
  const [searchQuery, setSearchQuery] = useState('');

  // Menggunakan custom hook useBookStats untuk menghitung statistik buku
  const stats = useBookStats(books);

  // Fungsi menambah buku baru (menggunakan spread operator agar state tetap immutable)
  const addBook = (newBook) => {
    setBooks([...books, newBook]);
  };

  // Fungsi mengedit / memperbarui data buku berdasarkan ID
  const updateBook = (updatedBook) => {
    setBooks(
      books.map((book) => (book.id === updatedBook.id ? updatedBook : book))
    );
    setEditingBook(null);
  };

  // Fungsi menghapus buku berdasarkan ID menggunakan filter()
  const deleteBook = (bookId) => {
    setBooks(books.filter((book) => book.id !== bookId));
    if (editingBook && editingBook.id === bookId) {
      setEditingBook(null);
    }
  };

  // Fungsi memilih buku yang akan diedit di BookForm
  const startEditBook = (book) => {
    setEditingBook(book);
  };

  // Fungsi membatalkan mode edit
  const cancelEditBook = () => {
    setEditingBook(null);
  };

  // Memfilter daftar buku berdasarkan status dan pencarian judul / penulis
  const filteredBooks = books.filter((book) => {
    const matchStatus =
      filterStatus === 'semua' ? true : book.status === filterStatus;

    const query = searchQuery.toLowerCase().trim();
    const matchSearch =
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query);

    return matchStatus && matchSearch;
  });

  const value = {
    books,
    filteredBooks,
    editingBook,
    filterStatus,
    searchQuery,
    stats,
    setFilterStatus,
    setSearchQuery,
    addBook,
    updateBook,
    deleteBook,
    startEditBook,
    cancelEditBook,
  };

  return (
    <BookContext.Provider value={value}>
      {children}
    </BookContext.Provider>
  );
}

BookProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
