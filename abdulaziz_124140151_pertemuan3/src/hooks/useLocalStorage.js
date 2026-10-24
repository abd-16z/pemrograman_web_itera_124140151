import { useState, useEffect } from 'react';

// Custom Hook 1: useLocalStorage
// Digunakan untuk membaca dan menyimpan data buku ke localStorage secara otomatis
function useLocalStorage(key, initialValue) {
  // Mengambil nilai awal dari localStorage saat komponen pertama kali dimuat (lazy initialization)
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Gagal membaca data dari localStorage:', error);
      return initialValue;
    }
  });

  // Menyimpan ulang ke localStorage setiap kali key atau storedValue berubah
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error('Gagal menyimpan data ke localStorage:', error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
