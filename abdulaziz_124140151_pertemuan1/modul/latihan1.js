// ============================================================
// LATIHAN 1: Variabel & Kondisional
// ============================================================

// 1. Variabel data diri (const dan let)
const nama = "Abdul Aziz";
let umur = 20;
const kotaAsal = "Padang Panjang";

console.log("Nama: " + nama);
console.log("Umur: " + umur);
console.log("Kota Asal: " + kotaAsal);

document.getElementById("result").innerHTML = `
  <h3>Data Diri</h3>
  <p>Nama: <strong>${nama}</strong></p>
  <p>Umur: <strong>${umur}</strong></p>
  <p>Kota Asal: <strong>${kotaAsal}</strong></p>
`;

// 2. Program pengecekan kelulusan (syarat nilai >= 70)
let nilai = 75;
let statusKelulusan = "";

if (nilai >= 70) {
  statusKelulusan = "Lulus";
} else {
  statusKelulusan = "Tidak Lulus";
}

console.log("Nilai: " + nilai + ", Status: " + statusKelulusan);
document.getElementById("result").innerHTML += `
  <hr>
  <h3>Cek Kelulusan</h3>
  <p>Nilai: <strong>${nilai}</strong></p>
  <p>Status: <strong>${statusKelulusan}</strong></p>
`;

// 3. Program kategori umur
let umurCek = 20;
let kategoriUmur = "";

if (umurCek < 12) {
  kategoriUmur = "Anak-anak";
} else if (umurCek <= 17) {
  kategoriUmur = "Remaja";
} else if (umurCek <= 59) {
  kategoriUmur = "Dewasa";
} else {
  kategoriUmur = "Lansia";
}

console.log("Umur: " + umurCek + ", Kategori: " + kategoriUmur);
document.getElementById("result").innerHTML += `
  <hr>
  <h3>Kategori Umur</h3>
  <p>Umur: <strong>${umurCek}</strong></p>
  <p>Kategori: <strong>${kategoriUmur}</strong></p>
`;

// 4. Switch-case: konversi angka hari (1-7) ke nama hari bahasa Inggris
let angkaHari = 3;
let namaHariInggris = "";

switch (angkaHari) {
  case 1:
    namaHariInggris = "Monday";
    break;
  case 2:
    namaHariInggris = "Tuesday";
    break;
  case 3:
    namaHariInggris = "Wednesday";
    break;
  case 4:
    namaHariInggris = "Thursday";
    break;
  case 5:
    namaHariInggris = "Friday";
    break;
  case 6:
    namaHariInggris = "Saturday";
    break;
  case 7:
    namaHariInggris = "Sunday";
    break;
  default:
    namaHariInggris = "Angka hari tidak valid";
}

console.log("Hari ke-" + angkaHari + ": " + namaHariInggris);
document.getElementById("result").innerHTML += `
  <hr>
  <h3>Konversi Hari (Inggris)</h3>
  <p>Hari ke-${angkaHari}: <strong>${namaHariInggris}</strong></p>
`;

// 5. Kalkulator grade nilai dengan ternary operator
let nilaiGrade = 85;
let grade =
  nilaiGrade >= 90 ? "A" :
  nilaiGrade >= 80 ? "B" :
  nilaiGrade >= 70 ? "C" :
  nilaiGrade >= 60 ? "D" : "E";

console.log("Nilai: " + nilaiGrade + ", Grade: " + grade);
document.getElementById("result").innerHTML += `
  <hr>
  <h3>Grade Nilai (Ternary)</h3>
  <p>Nilai: <strong>${nilaiGrade}</strong></p>
  <p>Grade: <strong>${grade}</strong></p>
`;

// ============================================================
// LATIHAN 2: Loop & Fungsi
// ============================================================

// 1. Loop tabel perkalian 1-10 (input dinamis)
function tampilkanTabelPerkalian() {
  const angka = parseInt(document.getElementById("angka-perkalian").value, 10);
  const tabel = document.getElementById("tabel-perkalian");

  tabel.innerHTML = "";

  if (isNaN(angka) || angka < 0) {
    tabel.innerHTML = "<li>Masukkan angka valid (0 atau lebih).</li>";
    return;
  }

  for (let i = 1; i <= 10; i++) {
    tabel.innerHTML += `<li>${angka} x ${i} = ${angka * i}</li>`;
  }
}

document.getElementById("btn-tabel-perkalian").addEventListener("click", tampilkanTabelPerkalian);

// 2. Fungsi menghitung faktorial
function hitungFaktorial(n) {
  if (!Number.isInteger(n) || n < 0) {
    return null;
  }

  let hasil = 1;
  for (let i = 2; i <= n; i++) {
    hasil *= i;
  }
  return hasil;
}

function hitungFaktorialDariInput() {
  const angka = parseInt(document.getElementById("angka-faktorial").value, 10);
  const output = document.getElementById("faktorial-output");

  if (isNaN(angka) || angka < 0) {
    output.innerHTML = "<p class='error'>Masukkan angka bulat non-negatif.</p>";
    return;
  }

  const hasil = hitungFaktorial(angka);
  output.innerHTML = `<p>${angka}! = <strong>${hasil}</strong></p>`;
}

document.getElementById("btn-faktorial").addEventListener("click", hitungFaktorialDariInput);

// 3. Fungsi cek bilangan prima
function cekPrima(n) {
  if (!Number.isInteger(n) || n < 2) {
    return false;
  }

  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
}

function cekPrimaDariInput() {
  const angka = parseInt(document.getElementById("angka-prima").value, 10);
  const output = document.getElementById("prima-output");

  if (isNaN(angka) || angka < 2) {
    output.innerHTML = "<p class='error'>Masukkan angka 2 atau lebih untuk cek bilangan prima.</p>";
    return;
  }

  const hasilPrima = cekPrima(angka) ? "bilangan prima" : "bukan bilangan prima";
  output.innerHTML = `<p>${angka} adalah <strong>${hasilPrima}</strong></p>`;
}

document.getElementById("btn-prima").addEventListener("click", cekPrimaDariInput);

// 4. Kalkulator BMI dengan fungsi dan event handler
function hitungBMI(berat, tinggi) {
  const tinggiMeter = tinggi / 100;
  return berat / (tinggiMeter * tinggiMeter);
}

function kategoriBMI(bmi) {
  if (bmi < 18.5) {
    return "Berat badan kurang";
  } else if (bmi < 25) {
    return "Normal";
  } else if (bmi < 30) {
    return "Berat badan berlebih";
  } else {
    return "Obesitas";
  }
}

document.getElementById("btn-bmi").addEventListener("click", function() {
  const berat = parseFloat(document.getElementById("berat").value);
  const tinggi = parseFloat(document.getElementById("tinggi").value);

  if (isNaN(berat) || isNaN(tinggi) || berat <= 0 || tinggi <= 0) {
    document.getElementById("bmi-output").innerHTML =
      `<p class="error">Masukkan berat dan tinggi yang valid!</p>`;
  } else {
    const bmi = hitungBMI(berat, tinggi);
    document.getElementById("bmi-output").innerHTML = `
      <p>BMI: <strong>${bmi.toFixed(2)}</strong> (${kategoriBMI(bmi)})</p>
    `;
  }
});

// 5. Program FizzBuzz (1-100)
document.getElementById("result-loop").innerHTML += `
  <hr>
  <h3>FizzBuzz (1-100)</h3>
  <div id="fizzbuzz"></div>
`;

for (let i = 1; i <= 100; i++) {
  let output = "";
  if (i % 3 === 0 && i % 5 === 0) {
    output = "FizzBuzz";
  } else if (i % 3 === 0) {
    output = "Fizz";
  } else if (i % 5 === 0) {
    output = "Buzz";
  } else {
    output = i;
  }
  document.getElementById("fizzbuzz").innerHTML += `${output} `;
}

// ============================================================
// LATIHAN 3: Array & Objek
// ============================================================

// 1. Array berisi 5 objek mahasiswa + tampilkan dalam tabel HTML
let daftarMahasiswa = [
  { nama: "Doom", nim: "124140001", jurusan: "Teknik Informatika", nilai: 85 },
  { nama: "Thor", nim: "124140002", jurusan: "Teknik Informatika", nilai: 92 },
  { nama: "Steve", nim: "124140003", jurusan: "Sistem Informasi", nilai: 78 },
  { nama: "Natasha", nim: "124140004", jurusan: "Teknik Informatika", nilai: 90 },
  { nama: "Robert", nim: "124140005", jurusan: "Teknik Informatika", nilai: 88 }
];

let editIndex = -1;

// Fungsi untuk menampilkan tabel mahasiswa
function tampilkanTabelMahasiswa() {
  const tbody = document.getElementById("tabel-mahasiswa");
  tbody.innerHTML = "";

  daftarMahasiswa.forEach((mhs, index) => {
    tbody.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${mhs.nama}</td>
        <td>${mhs.nim}</td>
        <td>${mhs.jurusan}</td>
        <td>${mhs.nilai}</td>
        <td>
          <button onclick="editMahasiswa(${index})">Edit</button>
          <button onclick="hapusMahasiswa(${index})">Hapus</button>
        </td>
      </tr>
    `;
  });

  tampilkanInfoMahasiswa();
}

// 2. Cari mahasiswa dengan nilai tertinggi (method array reduce)
function cariNilaiTertinggi() {
  return daftarMahasiswa.reduce((tertinggi, mhs) =>
    mhs.nilai > tertinggi.nilai ? mhs : tertinggi
  );
}

// 3. Filter mahasiswa dengan nilai di atas rata-rata
function cariDiAtasRataRata() {
  const total = daftarMahasiswa.reduce((sum, mhs) => sum + mhs.nilai, 0);
  const rataRata = total / daftarMahasiswa.length;
  const diAtasRataRata = daftarMahasiswa.filter(mhs => mhs.nilai > rataRata);
  return { rataRata, diAtasRataRata };
}

// Menampilkan info nilai tertinggi & di atas rata-rata
function tampilkanInfoMahasiswa() {
  if (daftarMahasiswa.length === 0) {
    document.getElementById("info-mahasiswa").innerHTML = "<p>Data kosong.</p>";
    return;
  }

  const terbaik = cariNilaiTertinggi();
  const { rataRata, diAtasRataRata } = cariDiAtasRataRata();

  document.getElementById("info-mahasiswa").innerHTML = `
    <p><strong>Nilai tertinggi:</strong> ${terbaik.nama} (${terbaik.nilai})</p>
    <p><strong>Rata-rata nilai:</strong> ${rataRata.toFixed(2)}</p>
    <p><strong>Di atas rata-rata:</strong> ${diAtasRataRata.map(mhs => `${mhs.nama} (${mhs.nilai})`).join(", ") || "-"}</p>
  `;
}

// 4. Urutkan mahasiswa berdasarkan nama (ascending/descending)
document.getElementById("btn-sort-asc").addEventListener("click", function() {
  daftarMahasiswa.sort((a, b) => a.nama.localeCompare(b.nama));
  tampilkanTabelMahasiswa();
});

document.getElementById("btn-sort-desc").addEventListener("click", function() {
  daftarMahasiswa.sort((a, b) => b.nama.localeCompare(a.nama));
  tampilkanTabelMahasiswa();
});

// 5. CRUD sederhana data mahasiswa dengan event handler
document.getElementById("btn-tambah-mhs").addEventListener("click", function() {
  const namaInput = document.getElementById("mhs-nama").value.trim();
  const nimInput = document.getElementById("mhs-nim").value.trim();
  const jurusanInput = document.getElementById("mhs-jurusan").value.trim();
  const nilaiInput = parseFloat(document.getElementById("mhs-nilai").value);

  if (namaInput === "" || nimInput === "" || jurusanInput === "" || isNaN(nilaiInput)) {
    alert("Semua field wajib diisi dengan benar!");
    return;
  }

  if (editIndex === -1) {
    // Create: tambah data baru
    daftarMahasiswa.push({
      nama: namaInput,
      nim: nimInput,
      jurusan: jurusanInput,
      nilai: nilaiInput
    });
  } else {
    // Update: ubah data yang sedang diedit
    daftarMahasiswa[editIndex] = {
      nama: namaInput,
      nim: nimInput,
      jurusan: jurusanInput,
      nilai: nilaiInput
    };
    editIndex = -1;
    document.getElementById("btn-tambah-mhs").innerText = "Tambah";
    document.getElementById("btn-batal-edit").style.display = "none";
  }

  // Reset form
  document.getElementById("mhs-nama").value = "";
  document.getElementById("mhs-nim").value = "";
  document.getElementById("mhs-jurusan").value = "";
  document.getElementById("mhs-nilai").value = "";

  tampilkanTabelMahasiswa();
});

// Fungsi edit: isi form dengan data yang dipilih
function editMahasiswa(index) {
  const mhs = daftarMahasiswa[index];
  document.getElementById("mhs-nama").value = mhs.nama;
  document.getElementById("mhs-nim").value = mhs.nim;
  document.getElementById("mhs-jurusan").value = mhs.jurusan;
  document.getElementById("mhs-nilai").value = mhs.nilai;

  editIndex = index;
  document.getElementById("btn-tambah-mhs").innerText = "Update";
  document.getElementById("btn-batal-edit").style.display = "inline";
}

document.getElementById("btn-batal-edit").addEventListener("click", function() {
  editIndex = -1;
  document.getElementById("mhs-nama").value = "";
  document.getElementById("mhs-nim").value = "";
  document.getElementById("mhs-jurusan").value = "";
  document.getElementById("mhs-nilai").value = "";
  document.getElementById("btn-tambah-mhs").innerText = "Tambah";
  this.style.display = "none";
});

// Fungsi hapus data mahasiswa
function hapusMahasiswa(index) {
  daftarMahasiswa.splice(index, 1);
  tampilkanTabelMahasiswa();
}

// Tampilkan tabel saat pertama kali halaman dimuat
tampilkanTabelMahasiswa();

// ============================================================
// LATIHAN 4: DOM & API
// ============================================================

// 1 & 2. Form input data mahasiswa dengan validasi + localStorage
const KEY_MHS = "dataMahasiswa";
let mahasiswaTersimpan = JSON.parse(localStorage.getItem(KEY_MHS)) || [];

function tampilkanMahasiswaTersimpan() {
  const list = document.getElementById("daftar-mahasiswa-simpan");
  list.innerHTML = "";
  mahasiswaTersimpan.forEach(mhs => {
    list.innerHTML += `<li>${mhs.nama} - ${mhs.nim} - ${mhs.jurusan}</li>`;
  });
}

document.getElementById("btn-simpan-mhs").addEventListener("click", function() {
  const namaVal = document.getElementById("form-nama").value.trim();
  const nimVal = document.getElementById("form-nim").value.trim();
  const jurusanVal = document.getElementById("form-jurusan").value.trim();
  const errorEl = document.getElementById("form-error");

  // Validasi form
  if (namaVal.length < 3) {
    errorEl.innerText = "Nama wajib diisi minimal 3 karakter!";
    return;
  }
  if (nimVal === "") {
    errorEl.innerText = "NIM wajib diisi!";
    return;
  }
  if (jurusanVal === "") {
    errorEl.innerText = "Jurusan wajib diisi!";
    return;
  }

  errorEl.innerText = "";
  mahasiswaTersimpan.push({ nama: namaVal, nim: nimVal, jurusan: jurusanVal });

  // Simpan ke localStorage agar persisten
  localStorage.setItem(KEY_MHS, JSON.stringify(mahasiswaTersimpan));

  document.getElementById("form-nama").value = "";
  document.getElementById("form-nim").value = "";
  document.getElementById("form-jurusan").value = "";

  tampilkanMahasiswaTersimpan();
});

tampilkanMahasiswaTersimpan();

// 3 & 5. Fetch API dengan search/filter berdasarkan title + pagination
let semuaPost = [];
let halamanSekarang = 1;
const postPerHalaman = 10;

function tampilkanPost() {
  const keyword = document.getElementById("search-post").value.toLowerCase();

  // Filter berdasarkan title
  const postTerfilter = semuaPost.filter(post =>
    post.title.toLowerCase().includes(keyword)
  );

  // Pagination
  const totalHalaman = Math.max(1, Math.ceil(postTerfilter.length / postPerHalaman));
  if (halamanSekarang > totalHalaman) {
    halamanSekarang = totalHalaman;
  }
  const awal = (halamanSekarang - 1) * postPerHalaman;
  const postHalaman = postTerfilter.slice(awal, awal + postPerHalaman);

  const apiOutput = document.getElementById("api-output");
  apiOutput.innerHTML = "";

  if (postHalaman.length === 0) {
    apiOutput.innerHTML = "<p>Tidak ada post yang cocok.</p>";
  }

  postHalaman.forEach(post => {
    apiOutput.innerHTML += `
      <div style="border:1px solid #ccc; border-radius:4px; padding:8px; margin-bottom:8px;">
        <h4>${post.title}</h4>
        <p style="font-size:0.9em">${post.body}</p>
      </div>
    `;
  });

  document.getElementById("halaman-info").innerText =
    `Halaman ${halamanSekarang} dari ${totalHalaman}`;
}

document.getElementById("btn-fetch").addEventListener("click", async function() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    semuaPost = await response.json();
    halamanSekarang = 1;
    tampilkanPost();
  } catch (error) {
    console.error("Error fetching data:", error);
    document.getElementById("api-output").innerHTML = `
      <p class="error">Gagal mengambil data: ${error.message}</p>
    `;
  }
});

document.getElementById("search-post").addEventListener("input", function() {
  halamanSekarang = 1;
  tampilkanPost();
});

document.getElementById("btn-prev").addEventListener("click", function() {
  if (halamanSekarang > 1) {
    halamanSekarang--;
    tampilkanPost();
  }
});

document.getElementById("btn-next").addEventListener("click", function() {
  halamanSekarang++;
  tampilkanPost();
});

// 4. Dark mode toggle dengan manipulasi class CSS
document.getElementById("btn-darkmode").addEventListener("click", function() {
  document.body.classList.toggle("dark");
});

// 6. Todo List sederhana (tambah, hapus, tandai selesai) + localStorage
const KEY_TODO = "dataTodo";
let daftarTodo = JSON.parse(localStorage.getItem(KEY_TODO)) || [];

function simpanTodo() {
  localStorage.setItem(KEY_TODO, JSON.stringify(daftarTodo));
}

function tampilkanTodo() {
  const list = document.getElementById("todo-list");
  list.innerHTML = "";

  daftarTodo.forEach((todo, index) => {
    list.innerHTML += `
      <li>
        <span class="${todo.selesai ? "selesai" : ""}"
              style="cursor:pointer"
              onclick="toggleTodo(${index})">
          ${todo.teks}
        </span>
        <button onclick="hapusTodo(${index})">Hapus</button>
      </li>
    `;
  });
}

document.getElementById("btn-tambah-todo").addEventListener("click", function() {
  const teks = document.getElementById("todo-input").value.trim();

  if (teks === "") {
    alert("Tugas tidak boleh kosong!");
    return;
  }

  daftarTodo.push({ teks: teks, selesai: false });
  simpanTodo();

  document.getElementById("todo-input").value = "";
  tampilkanTodo();
});

// Tandai selesai / belum selesai
function toggleTodo(index) {
  daftarTodo[index].selesai = !daftarTodo[index].selesai;
  simpanTodo();
  tampilkanTodo();
}

// Hapus todo
function hapusTodo(index) {
  daftarTodo.splice(index, 1);
  simpanTodo();
  tampilkanTodo();
}

tampilkanTodo();
