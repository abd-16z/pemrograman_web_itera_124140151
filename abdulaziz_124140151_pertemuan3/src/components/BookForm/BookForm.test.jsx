import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookForm from './BookForm';

// Deteksi otomatis mock function: vi untuk Vite (Vitest), jest untuk Create React App
const mockFn = typeof vi !== 'undefined' ? vi.fn : jest.fn;
const clearMocks = typeof vi !== 'undefined' ? vi.clearAllMocks : jest.clearAllMocks;

describe('Komponen BookForm', () => {
  const mockSubmit = mockFn();

  beforeEach(() => {
    clearMocks();
  });

  // Test Unit 5
  test('menampilkan pesan error validasi ketika form disubmit dalam keadaan kosong', () => {
    render(<BookForm onSubmitBook={mockSubmit} />);
    const submitBtn = screen.getByText('Tambah Buku');
    fireEvent.click(submitBtn);

    expect(screen.getByText('Judul buku wajib diisi!')).toBeInTheDocument();
    expect(screen.getByText('Nama penulis wajib diisi!')).toBeInTheDocument();
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  // Test Unit 6
  test('memanggil fungsi onSubmitBook saat form diisi dengan benar', () => {
    render(<BookForm onSubmitBook={mockSubmit} />);

    const titleInput = screen.getByPlaceholderText('Tulis judul buku disini');
    const authorInput = screen.getByPlaceholderText('Tulis nama penulis disini');
    const submitBtn = screen.getByText('Tambah Buku');

    fireEvent.change(titleInput, { target: { value: 'Filosofi Teras' } });
    fireEvent.change(authorInput, { target: { value: 'Henry Manampiring' } });
    fireEvent.click(submitBtn);

    expect(mockSubmit).toHaveBeenCalledTimes(1);
    expect(mockSubmit.mock.calls[0][0]).toMatchObject({
      title: 'Filosofi Teras',
      author: 'Henry Manampiring',
      status: 'milik',
    });
  });
});
