import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookList from './BookList';

// Deteksi otomatis mock function: vi untuk Vite (Vitest), jest untuk Create React App
const mockFn = typeof vi !== 'undefined' ? vi.fn : jest.fn;
const clearMocks = typeof vi !== 'undefined' ? vi.clearAllMocks : jest.clearAllMocks;

describe('Komponen BookList', () => {
  const dummyBooks = [
    {
      id: 1,
      title: 'Bumi Manusia',
      author: 'Pramoedya Ananta Toer',
      status: 'milik',
    },
    {
      id: 2,
      title: 'Clean Code',
      author: 'Robert C. Martin',
      status: 'baca',
    },
  ];

  const mockEdit = mockFn();
  const mockDelete = mockFn();

  beforeEach(() => {
    clearMocks();
  });

  // Test Unit 1
  test('merender daftar judul dan penulis buku dengan benar', () => {
    render(<BookList books={dummyBooks} onEdit={mockEdit} onDelete={mockDelete} />);
    expect(screen.getByText('Bumi Manusia')).toBeInTheDocument();
    expect(screen.getByText('Penulis: Pramoedya Ananta Toer')).toBeInTheDocument();
    expect(screen.getByText('Clean Code')).toBeInTheDocument();
  });

  // Test Unit 2
  test('menampilkan pesan kosong jika belum ada data buku', () => {
    render(<BookList books={[]} onEdit={mockEdit} onDelete={mockDelete} />);
    expect(
      screen.getByText(/Belum ada buku yang sesuai/i)
    ).toBeInTheDocument();
  });

  // Test Unit 3
  test('memanggil fungsi onEdit saat tombol Edit diklik', () => {
    render(<BookList books={dummyBooks} onEdit={mockEdit} onDelete={mockDelete} />);
    const editButtons = screen.getAllByText('Edit');
    fireEvent.click(editButtons[0]);
    expect(mockEdit).toHaveBeenCalledWith(dummyBooks[0]);
  });

  // Test Unit 4
  test('memanggil fungsi onDelete saat tombol Hapus diklik', () => {
    render(<BookList books={dummyBooks} onEdit={mockEdit} onDelete={mockDelete} />);
    const deleteButtons = screen.getAllByText('Hapus');
    fireEvent.click(deleteButtons[0]);
    expect(mockDelete).toHaveBeenCalledWith(1);
  });
});
