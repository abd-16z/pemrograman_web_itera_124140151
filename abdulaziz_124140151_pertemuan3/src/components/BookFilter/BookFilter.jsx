import React from 'react';
import PropTypes from 'prop-types';
import './BookFilter.css';

// Komponen untuk memfilter buku berdasarkan status dan mencari berdasarkan judul/penulis
function BookFilter({
  filterStatus,
  onFilterChange,
  searchQuery,
  onSearchChange,
}) {
  const filterOptions = [
    { value: 'semua', label: 'Semua Buku' },
    { value: 'milik', label: 'Dimiliki' },
    { value: 'baca', label: 'Sedang Dibaca' },
    { value: 'beli', label: 'Ingin Dibeli' },
  ];

  return (
    <fieldset className="book-filter">
      <legend>Pencarian &amp; Filter Buku</legend>

      <div className="form-group">
        <label htmlFor="search-book">Cari Buku</label>
        <input
          id="search-book"
          type="text"
          placeholder="Cari judul buku atau nama penulis..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="form-group" style={{ marginBottom: 0 }}>
        <span className="label-text">Filter Status</span>
        <div className="filter-buttons">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`filter-btn ${
                filterStatus === option.value ? 'active' : ''
              }`}
              onClick={() => onFilterChange(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </fieldset>
  );
}

BookFilter.propTypes = {
  filterStatus: PropTypes.oneOf(['semua', 'milik', 'baca', 'beli']).isRequired,
  onFilterChange: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};

export default BookFilter;
