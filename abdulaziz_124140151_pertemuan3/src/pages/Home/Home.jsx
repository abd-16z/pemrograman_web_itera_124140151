import React from 'react';
import Header from '../../components/Header/Header';
import BookForm from '../../components/BookForm/BookForm';
import BookFilter from '../../components/BookFilter/BookFilter';
import BookList from '../../components/BookList/BookList';
import { useBooks } from '../../context/BookContext';
import './Home.css';

function Home() {
  // Mengambil state dan fungsi dari BookContext
  const {
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
  } = useBooks();

  // Menentukan apakah form menyimpan buku baru atau mengupdate buku yang sedang diedit
  const handleFormSubmit = (bookData) => {
    if (editingBook) {
      updateBook(bookData);
    } else {
      addBook(bookData);
    }
  };

  return (
    <div className="home">
      <div className="home-header-card">
        <Header
          title="Koleksi Buku"
          description="Catat buku yang dimiliki, sedang dibaca, dan ingin dibeli"
        />

        <div className="quick-stats">
          <div className="quick-stat-item">
            <span>Total Buku</span>
            <strong>{stats.total}</strong>
          </div>
          <div className="quick-stat-item">
            <span>Sudah Dimiliki</span>
            <strong style={{ color: '#10b981' }}>{stats.milik}</strong>
          </div>
          <div className="quick-stat-item">
            <span>Sedang Dibaca</span>
            <strong style={{ color: '#3b82f6' }}>{stats.baca}</strong>
          </div>
          <div className="quick-stat-item">
            <span>Ingin Dibeli</span>
            <strong style={{ color: '#d97706' }}>{stats.beli}</strong>
          </div>
        </div>
      </div>

      <main className="container home-grid">
        <aside className="home-left-col">
          <div className="panel-card">
            <BookForm
              onSubmitBook={handleFormSubmit}
              editingBook={editingBook}
              onCancelEdit={cancelEditBook}
            />
          </div>
        </aside>

        <section className="home-right-col">
          <div className="panel-card">
            <BookFilter
              filterStatus={filterStatus}
              onFilterChange={setFilterStatus}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </div>

          <div className="panel-card">
            <BookList
              books={filteredBooks}
              onEdit={startEditBook}
              onDelete={deleteBook}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
