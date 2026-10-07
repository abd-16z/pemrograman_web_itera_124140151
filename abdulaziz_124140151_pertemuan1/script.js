// State aplikasi dari localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Element DOM
const formBarang = document.getElementById('form-barang');
const inputNama = document.getElementById('nama-barang');
const inputHarga = document.getElementById('harga-barang');
const inputQty = document.getElementById('qty-barang');

const errNama = document.getElementById('err-nama');
const errHarga = document.getElementById('err-harga');
const errQty = document.getElementById('err-qty');

const cartBody = document.getElementById('cart-body');
const elTotalBelanja = document.getElementById('total-belanja');
const elDiskon = document.getElementById('diskon');
const elTotalAkhir = document.getElementById('total-akhir');

const inputUangBayar = document.getElementById('uang-bayar');
const elKembalian = document.getElementById('kembalian');
const errPembayaran = document.getElementById('err-pembayaran');
const btnReset = document.getElementById('btn-reset');

// Render Keranjang dan Hitung Kalkulasi
function renderCart() {
  cartBody.innerHTML = '';
  let totalBelanja = 0;

  if (cart.length === 0) {
    cartBody.innerHTML = '<tr><td colspan="6" style="text-align:center; color:#888;">Keranjang belanja kosong</td></tr>';
  } else {
    cart.forEach((item, index) => {
      const subtotal = item.harga * item.qty;
      totalBelanja += subtotal;

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${item.nama}</td>
        <td>Rp ${item.harga.toLocaleString('id-ID')}</td>
        <td>${item.qty}</td>
        <td>Rp ${subtotal.toLocaleString('id-ID')}</td>
        <td><button class="btn-delete" onclick="hapusItem(${item.id})">Hapus</button></td>
      `;
      cartBody.appendChild(tr);
    });
  }

  // Hitung Diskon (10% jika Total >= Rp 50.000)
  let diskon = 0;
  if (totalBelanja >= 50000) {
    diskon = totalBelanja * 0.1;
  }
  const totalAkhir = totalBelanja - diskon;

  // Update Tampilan Ringkasan
  elTotalBelanja.innerText = `Rp ${totalBelanja.toLocaleString('id-ID')}`;
  elDiskon.innerText = `Rp ${diskon.toLocaleString('id-ID')}`;
  elTotalAkhir.innerText = `Rp ${totalAkhir.toLocaleString('id-ID')}`;

  // Simpan ke LocalStorage
  localStorage.setItem('cart', JSON.stringify(cart));

  // Update Kembalian
  hitugKembalian(totalAkhir);
}

// Fungsi Hapus Item
window.hapusItem = function(id) {
  cart = cart.filter(item => item.id !== id);
  renderCart();
};

// Hitung Uang Kembalian
function hitugKembalian(totalAkhir) {
  const uangBayar = parseFloat(inputUangBayar.value) || 0;

  if (cart.length === 0 || uangBayar === 0) {
    elKembalian.innerText = 'Rp 0';
    errPembayaran.innerText = '';
    return;
  }

  if (uangBayar < totalAkhir) {
    errPembayaran.innerText = 'Uang bayar belum mencukupi!';
    elKembalian.innerText = 'Rp 0';
  } else {
    errPembayaran.innerText = '';
    const kembalian = uangBayar - totalAkhir;
    elKembalian.innerText = `Rp ${kembalian.toLocaleString('id-ID')}`;
  }
}

// Validasi Form Input
function validasiForm() {
  let isValid = true;

  // Bersihkan error sebelumnya
  errNama.innerText = '';
  errHarga.innerText = '';
  errQty.innerText = '';

  const nama = inputNama.value.trim();
  const harga = parseFloat(inputHarga.value);
  const qty = parseInt(inputQty.value, 10);

  // Validasi Nama Barang
  if (!nama || nama.length < 3) {
    errNama.innerText = 'Nama barang wajib diisi & minimal 3 karakter!';
    isValid = false;
  }

  // Validasi Harga Satuan
  if (isNaN(harga) || harga < 500) {
    errHarga.innerText = 'Harga minimal Rp 500 dan harus berupa angka positif!';
    isValid = false;
  }

  // Validasi Qty
  if (isNaN(qty) || qty < 1) {
    errQty.innerText = 'Jumlah (Qty) minimal 1 dan berupa angka bulat!';
    isValid = false;
  }

  return isValid ? { nama, harga, qty } : null;
}

// Event Handler Tambah Barang
formBarang.addEventListener('submit', (e) => {
  e.preventDefault();
  const dataInput = validasiForm();

  if (dataInput) {
    cart.push({
      id: Date.now(),
      nama: dataInput.nama,
      harga: dataInput.harga,
      qty: dataInput.qty
    });

    formBarang.reset();
    document.getElementById('qty-barang').value = 1;
    renderCart();
  }
});

// Event Handler Input Uang Bayar
inputUangBayar.addEventListener('input', () => {
  const totalBelanja = cart.reduce((sum, item) => sum + (item.harga * item.qty), 0);
  const diskon = totalBelanja >= 50000 ? totalBelanja * 0.1 : 0;
  hitugKembalian(totalBelanja - diskon);
});

// Event Handler Reset / Transaksi Baru
btnReset.addEventListener('click', () => {
  if (confirm('Apakah Anda yakin ingin mengosongkan keranjang?')) {
    cart = [];
    localStorage.removeItem('cart');
    inputUangBayar.value = '';
    renderCart();
  }
});

// Load awal saat halaman dibuka
renderCart();
