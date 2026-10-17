"use strict";

// ===== Latihan 1: let, const, arrow function, template literals =====
{
const $ = (id) => document.getElementById(id);
const show = (id, text, isErr = false) => { $(id).innerHTML = `<span class="${isErr ? "err" : ""}">${text}</span>`; console.log(text); };

// 1. const
const PI = 3.14;
const mahasiswa = { nama: "Rina", nilai: 80 };
$("e1-btnConst").addEventListener("click", () => {
  const nilaiBaru = Number($("e1-constVal").value);
  try {
    PI = nilaiBaru; // sengaja salah: const tidak boleh di-assign ulang
  } catch (err) {
    show("e1-out1", `PI = ${nilaiBaru}  →  ${err.name}: ${err.message}\nPI tetap ${PI}`, true);
  }
});
$("e1-btnConstObj").addEventListener("click", () => {
  mahasiswa.nilai += 5; // mengubah properti diperbolehkan
  show("e1-out1", `Properti objek const berubah: ${JSON.stringify(mahasiswa)}`);
});

// 2. var vs let
$("e1-btnVar").addEventListener("click", () => {
  const log = [];
  if (true) { var dariVar = "saya var"; let dariLet = "saya let"; log.push(`Di dalam block: ${dariVar}, ${dariLet}`); }
  log.push(`Di luar block, var   : ${dariVar}`);
  try { log.push(`Di luar block, let   : ${dariLet}`); }
  catch (err) { log.push(`Di luar block, let   : ${err.name} — ${err.message}`); }

  const fnVar = [], fnLet = [];
  for (var i = 0; i < 3; i++) fnVar.push(() => i);
  for (let j = 0; j < 3; j++) fnLet.push(() => j);
  log.push(`Closure dalam loop var: ${fnVar.map((f) => f())}`);
  log.push(`Closure dalam loop let: ${fnLet.map((f) => f())}`);
  show("e1-out2", log.join("\n"));
});

// 3. arrow function
$("e1-btnArrow").addEventListener("click", () => {
  const n = Number($("e1-num").value);
  const kuadrat = (x) => x * x;                   // satu parameter, return implisit
  const tambah = (a, b) => a + b;                 // dua parameter
  const sapa = () => "Halo dari arrow!";          // tanpa parameter
  const info = (x) => { const genap = x % 2 === 0; return genap ? "genap" : "ganjil"; }; // body blok
  const buatObj = (x) => ({ nilai: x, kuadrat: kuadrat(x) }); // return objek pakai ()
  show("e1-out3", [
    `kuadrat(${n}) = ${kuadrat(n)}`,
    `tambah(${n}, 10) = ${tambah(n, 10)}`,
    `sapa() = ${sapa()}`,
    `info(${n}) = ${info(n)}`,
    `buatObj(${n}) = ${JSON.stringify(buatObj(n))}`,
    `[1,2,3].map(x => x * ${n}) = ${[1, 2, 3].map((x) => x * n)}`
  ].join("\n"));
});

// 4. template literals
const rupiah = (n) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);
$("e1-btnTpl").addEventListener("click", () => {
  const name = $("e1-pName").value || "Tanpa nama";
  const price = Number($("e1-pPrice").value) || 0;
  const stock = Number($("e1-pStock").value) || 0;
  const esc = (s) => s.replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`);
  $("e1-cardHost").innerHTML = `
    <div class="box">
      <strong>${esc(name)}</strong>
      <div>${rupiah(price)}</div>
      <div class="${stock < 5 ? "stok-low" : ""}">${stock === 0 ? "Stok habis" : `Stok tersisa ${stock} unit`}</div>
    </div>`;
});

}

// ===== Latihan 2: Destructuring, spread, dan rest =====
{
const $ = (id) => document.getElementById(id);
const print = (id, text, isErr) => { $(id).innerHTML = isErr ? `<span class="err">${text}</span>` : text; };

$("e2-nestedJson").value = JSON.stringify({
  nama: "Dewi",
  alamat: { kota: "Bandar Lampung", detail: { jalan: "Jl. Terusan Ryacudu", koordinat: { lat: -5.36, lon: 105.31 } } }
}, null, 2);
$("e2-objA").value = '{"nama":"Aku","tema":"terang","bahasa":"id"}';
$("e2-objB").value = '{"tema":"gelap","ukuranFont":14}';
$("e2-objC").value = '{"ukuranFont":18,"notifikasi":true}';

// 1. nested destructuring
$("e2-btnNested").addEventListener("click", () => {
  try {
    const data = JSON.parse($("e2-nestedJson").value);
    const { nama, alamat: { kota, detail: { jalan, koordinat: { lat } } } } = data;
    print("e2-out1", `nama  = ${nama}\nkota  = ${kota}\njalan = ${jalan}\nlat   = ${lat}`);
  } catch (err) {
    print("e2-out1", `${err.name}: ${err.message}\n(pastikan struktur alamat → detail → koordinat ada)`, true);
  }
});

// 2. rest parameters
const statistik = (...angka) => {
  const [pertama, ...sisa] = angka; // rest juga dipakai di array destructuring
  const total = angka.reduce((sum, n) => sum + n, 0);
  return { jumlahData: angka.length, min: Math.min(...angka), max: Math.max(...angka), rataRata: +(total / angka.length).toFixed(2), pertama, sisa };
};
$("e2-btnStats").addEventListener("click", () => {
  const angka = $("e2-nums").value.split(",").map(Number).filter((n) => !Number.isNaN(n));
  print("e2-out2", angka.length ? JSON.stringify(statistik(...angka), null, 2) : "Masukkan minimal satu angka.", !angka.length);
});

// 3. merge dengan spread
$("e2-btnMerge").addEventListener("click", () => {
  try {
    const [a, b, c] = ["objA", "objB", "objC"].map((id) => JSON.parse($(id).value));
    const hasil = { ...a, ...b, ...c, digabungPada: "sekarang" };
    print("e2-out3", JSON.stringify(hasil, null, 2));
  } catch (err) {
    print("e2-out3", `JSON tidak valid: ${err.message}`, true);
  }
});

// 4. destructuring di for...of
const mahasiswa = [
  { nama: "Andi", nim: "123", nilai: { uts: 80, uas: 90 } },
  { nama: "Sari", nim: "456", nilai: { uts: 70, uas: 85 } },
  { nama: "Budi", nim: "789", nilai: { uts: 60, uas: 75 } }
];
$("e2-btnLoop").addEventListener("click", () => {
  const baris = [];
  for (const { nama, nim, nilai: { uts, uas } } of mahasiswa) baris.push(`${nim} ${nama.padEnd(6)} UTS ${uts}  UAS ${uas}  Rata-rata ${(uts + uas) / 2}`);
  for (const [i, { nama }] of mahasiswa.entries()) baris.push(`#${i + 1} ${nama}`);
  print("e2-out4", baris.join("\n"));
});

}

// ===== Latihan 3: Classes dan object literals =====
{
const $ = (id) => document.getElementById(id);
const rupiah = (n) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);

class Product {
  #harga = 0; // field privat, diakses lewat getter/setter
  constructor(nama, harga) { this.nama = nama; this.harga = harga; }
  get harga() { return this.#harga; }
  set harga(nilai) {
    if (!Number.isFinite(nilai) || nilai < 0) throw new RangeError(`Harga tidak valid: ${nilai}`);
    this.#harga = nilai;
  }
  get label() { return `${this.nama} — ${rupiah(this.harga)}`; }
  describe() { return "Produk umum"; }
}

class DigitalProduct extends Product {
  constructor(nama, harga, ukuranMB) { super(nama, harga); this.ukuranMB = ukuranMB; }
  describe() { return `Unduhan ${this.ukuranMB} MB, tanpa ongkir`; }
}

class PhysicalProduct extends Product {
  constructor(nama, harga, beratKg) { super(nama, harga); this.beratKg = beratKg; }
  get ongkir() { return Math.ceil(this.beratKg) * 10000; }
  describe() { return `Berat ${this.beratKg} kg, ongkir ${rupiah(this.ongkir)}`; }
}

// default parameter + destructuring pada parameter fungsi
const buatProduk = ({ tipe = "digital", nama = "Produk tanpa nama", harga = 0, extra = 1 } = {}) =>
  tipe === "fisik" ? new PhysicalProduct(nama, harga, extra) : new DigitalProduct(nama, harga, extra);

const daftar = [buatProduk({ nama: "E-book ES6", harga: 50000, extra: 12 }), buatProduk({ tipe: "fisik", nama: "Mouse", harga: 120000, extra: 0.3 })];

const renderList = () => {
  $("e3-produkList").innerHTML = daftar.map((p) => `
    <div class="item"><span><strong>${p.label.replace(/</g, "&lt;")}</strong> <span class="tag">${p.constructor.name}</span></span>
    <span>${p.describe()}</span></div>`).join("");
};

$("e3-btnBuat").addEventListener("click", () => {
  const ambil = (id) => $(id).value.trim();
  const data = { tipe: $("e3-tipe").value, nama: ambil("nama") || undefined, harga: ambil("harga") === "" ? undefined : Number(ambil("harga")), extra: ambil("extra") === "" ? undefined : Number(ambil("extra")) };
  try { daftar.push(buatProduk(data)); renderList(); }
  catch (err) { alert(err.message); }
});

$("e3-btnSetter").addEventListener("click", () => {
  const nilai = Number($("e3-hargaBaru").value);
  try { daftar[0].harga = nilai; $("e3-out2").textContent = `Berhasil: ${daftar[0].label}`; renderList(); }
  catch (err) { $("e3-out2").innerHTML = `<span class="err">${err.name}: ${err.message}</span>`; }
});

$("e3-btnKey").addEventListener("click", () => {
  const kunci = $("e3-kunci").value.trim() || "kunci";
  const obj = { id: 1, [kunci]: $("e3-nilai").value, [`${kunci}Upper`]: $("e3-nilai").value.toUpperCase() };
  $("e3-out3").textContent = JSON.stringify(obj, null, 2);
});

renderList();

}

// ===== Latihan 4: Modern array methods =====
{
const $ = (id) => document.getElementById(id);
const rupiah = (n) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);

const penjualan = [
  { produk: "Laptop", kategori: "tech", kota: "Bandar Lampung", harga: 9000000, terjual: 4 },
  { produk: "Keyboard", kategori: "tech", kota: "Metro", harga: 850000, terjual: 15 },
  { produk: "Kursi", kategori: "furniture", kota: "Bandar Lampung", harga: 1200000, terjual: 8 },
  { produk: "Meja", kategori: "furniture", kota: "Metro", harga: 1800000, terjual: 6 },
  { produk: "Mouse", kategori: "tech", kota: "Bandar Lampung", harga: 150000, terjual: 32 }
];
$("e4-dataset").textContent = penjualan.map(({ produk, kategori, kota, harga, terjual }) => `${produk.padEnd(9)} ${kategori.padEnd(10)} ${kota.padEnd(15)} ${rupiah(harga).padStart(14)} x${terjual}`).join("\n");

// 1. groupBy
const groupBy = (arr, key) => arr.reduce((acc, item) => ({ ...acc, [item[key]]: [...(acc[item[key]] ?? []), item.produk] }), {});
$("e4-btnGroup").addEventListener("click", () => { $("e4-out1").textContent = JSON.stringify(groupBy(penjualan, $("e4-groupKey").value), null, 2); });

// 2. rata-rata
const average = (arr, key) => (arr.length ? arr.reduce((sum, item) => sum + item[key], 0) / arr.length : 0);
$("e4-btnAvg").addEventListener("click", () => {
  const key = $("e4-avgKey").value;
  const hasil = average(penjualan, key);
  $("e4-out2").textContent = `Rata-rata ${key} = ${key === "harga" ? rupiah(hasil) : hasil.toFixed(1)}`;
});

// 3. flatten
const bersarang = [["Senin", ["Kalkulus", "Fisika"]], ["Selasa", [["Pemrograman Web"], ["Basis Data"]]]];
$("e4-btnFlat").addEventListener("click", () => {
  const dalam = bersarang.flat(Infinity);
  const hariMatkul = [{ hari: "Senin", matkul: ["A", "B"] }, { hari: "Selasa", matkul: ["C"] }].flatMap(({ hari, matkul }) => matkul.map((m) => `${hari}: ${m}`));
  $("e4-out3").textContent = `Asli   : ${JSON.stringify(bersarang)}\nflat() : ${JSON.stringify(dalam)}\nflatMap: ${JSON.stringify(hariMatkul)}`;
});

// 4. kombinasi filter, map, reduce
$("e4-btnChain").addEventListener("click", () => {
  const min = Number($("e4-minTerjual").value) || 0;
  const laris = penjualan.filter(({ terjual }) => terjual >= min);
  const pendapatan = laris.map(({ produk, harga, terjual }) => ({ produk, total: harga * terjual }));
  const total = pendapatan.reduce((sum, { total }) => sum + total, 0);
  const terbesar = pendapatan.reduce((max, p) => (p.total > max.total ? p : max), { produk: "-", total: 0 });
  $("e4-out4").textContent = laris.length
    ? `Produk terjual ≥ ${min}: ${laris.map((p) => p.produk).join(", ")}\n${pendapatan.map(({ produk, total }) => `${produk}: ${rupiah(total)}`).join("\n")}\nTotal pendapatan: ${rupiah(total)}\nTerbesar: ${terbesar.produk}`
    : "Tidak ada produk yang memenuhi syarat.";
});

}

// ===== Latihan 5: Promise dan async/await =====
{
const $ = (id) => document.getElementById(id);
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const stamp = (t0) => `[${String(Date.now() - t0).padStart(4)} ms]`;

// ---- API simulasi ----
const db = {
  "/user": { id: 1, nama: "Dewi", prodi: "Teknik Informatika" },
  "/posts": [{ id: 1, judul: "Belajar ES6" }, { id: 2, judul: "Async itu mudah" }],
  "/todos": [{ id: 1, tugas: "Latihan 5", selesai: false }]
};
const fakeFetch = async (endpoint, ms = 600) => {
  await delay(ms);
  if (!(endpoint in db)) throw new Error(`404 ${endpoint} tidak ditemukan`);
  return structuredClone(db[endpoint]);
};

// 1. Promise.all + gabungkan
$("e5-btnMulti").addEventListener("click", async () => {
  const t0 = Date.now();
  $("e5-out1").textContent = "Memuat…";
  try {
    const [user, posts, todos] = await Promise.all([fakeFetch("/user", 700), fakeFetch("/posts", 500), fakeFetch("/todos", 900)]);
    $("e5-out1").textContent = `Selesai ${Date.now() - t0} ms (paralel, bukan 2100 ms)\n` + JSON.stringify({ ...user, posts, todos }, null, 2);
  } catch (err) {
    $("e5-out1").innerHTML = `<span class="err">${err.message}</span>`;
  }
});

// 2. retry + exponential backoff
const retry = async (fn, { retries = 4, base = 300, onAttempt } = {}) => {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try { return await fn(attempt); }
    catch (err) {
      if (attempt === retries) throw err;
      const wait = base * 2 ** attempt;
      onAttempt?.(attempt + 1, err, wait);
      await delay(wait);
    }
  }
};
$("e5-btnRetry").addEventListener("click", async () => {
  const gagalSebanyak = Number($("e5-failCount").value) || 0;
  const t0 = Date.now(), log = [];
  const tampil = () => { $("e5-out2").textContent = log.join("\n"); };
  $("e5-btnRetry").disabled = true;
  try {
    const hasil = await retry(async (attempt) => {
      await delay(100);
      if (attempt < gagalSebanyak) throw new Error("Server sibuk");
      return "data berhasil diambil";
    }, { retries: 4, onAttempt: (n, err, wait) => { log.push(`${stamp(t0)} percobaan ${n} gagal (${err.message}), tunggu ${wait} ms`); tampil(); } });
    log.push(`${stamp(t0)} sukses: ${hasil}`);
  } catch (err) {
    log.push(`${stamp(t0)} menyerah: ${err.message}`);
  } finally {
    tampil(); $("e5-btnRetry").disabled = false;
  }
});

// 3. loading state
$("e5-btnLoad").addEventListener("click", async () => {
  const btn = $("e5-btnLoad");
  btn.disabled = true;
  $("e5-out3").innerHTML = `<span class="spin"></span>Memuat data…`;
  try {
    const { nama, prodi } = await fakeFetch("/user", 1200);
    $("e5-out3").textContent = `Data dimuat: ${nama}, ${prodi}`;
  } catch (err) {
    $("e5-out3").textContent = `Gagal: ${err.message}`;
  } finally {
    btn.disabled = false;
  }
});

// 4. error boundary untuk kode async
const withBoundary = (fn, target) => async () => {
  target.textContent = "Memproses…";
  try { target.textContent = await fn(); }
  catch (err) { target.innerHTML = `<span class="err">Terjadi kesalahan: ${err.message}. Silakan coba lagi.</span>`; }
};
$("e5-btnOk").addEventListener("click", withBoundary(async () => { const { nama } = await fakeFetch("/user", 400); return `Halo, ${nama}!`; }, $("e5-out4")));
$("e5-btnFail").addEventListener("click", withBoundary(() => fakeFetch("/tidak-ada", 400), $("e5-out4")));

// 5. pagination
const semuaItem = Array.from({ length: 23 }, (_, i) => `Item ${i + 1}`);
const PER_PAGE = 5;
const fetchPage = async (page) => {
  await delay(350);
  const total = Math.ceil(semuaItem.length / PER_PAGE);
  return { page, total, items: semuaItem.slice((page - 1) * PER_PAGE, page * PER_PAGE) };
};
let halaman = 1;
const muatHalaman = async (page) => {
  $("e5-btnPrev").disabled = $("e5-btnNext").disabled = true;
  $("e5-out5").innerHTML = `<span class="spin"></span>Memuat halaman ${page}…`;
  const { total, items } = await fetchPage(page);
  halaman = page;
  $("e5-out5").innerHTML = `<ul>${items.map((it) => `<li>${it}</li>`).join("")}</ul>`;
  $("e5-pageInfo").textContent = `Halaman ${page} dari ${total}`;
  $("e5-btnPrev").disabled = page <= 1;
  $("e5-btnNext").disabled = page >= total;
};
$("e5-btnPrev").addEventListener("click", () => muatHalaman(halaman - 1));
$("e5-btnNext").addEventListener("click", () => muatHalaman(halaman + 1));
muatHalaman(1);

// 6. debounce + pencarian async
const debounce = (fn, ms) => { let timer; return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); }; };
const matkul = ["Pemrograman Web", "Basis Data", "Kalkulus", "Fisika Dasar", "Algoritma", "Jaringan Komputer", "Pemrograman Mobile"];
const cariMatkul = async (q) => { await delay(300); return matkul.filter((m) => m.toLowerCase().includes(q.toLowerCase())); };
let permintaanTerakhir = 0, jumlahPanggil = 0;
const jalankanCari = debounce(async (q) => {
  const id = ++permintaanTerakhir;
  jumlahPanggil++;
  if (!q.trim()) { $("e5-out6").textContent = "Ketik untuk mencari."; return; }
  $("e5-out6").textContent = "Mencari…";
  const hasil = await cariMatkul(q);
  if (id !== permintaanTerakhir) return; // abaikan respons usang
  $("e5-out6").textContent = `Permintaan ke-${jumlahPanggil} untuk "${q}":\n` + (hasil.join("\n") || "Tidak ada hasil.");
}, 400);
$("e5-search").addEventListener("input", (e) => jalankanCari(e.target.value));
$("e5-out6").textContent = "Ketik untuk mencari.";

}
