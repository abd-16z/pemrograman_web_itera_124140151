"use strict";

// ====== Konfigurasi ======
const STORAGE_KEY = "meja-kuliah-v1";
const ITERA = { lat: -5.36, lon: 105.31 };
const PRIORITY_LABELS = { high: "Tinggi", medium: "Sedang", low: "Rendah" };
const WEATHER_CODES = {
  0: "Cerah", 1: "Cerah berawan", 2: "Berawan sebagian", 3: "Mendung",
  45: "Berkabut", 48: "Berkabut", 51: "Gerimis ringan", 53: "Gerimis", 55: "Gerimis lebat",
  61: "Hujan ringan", 63: "Hujan", 65: "Hujan lebat", 80: "Hujan lokal", 81: "Hujan lokal",
  82: "Hujan deras", 95: "Badai petir", 96: "Badai petir", 99: "Badai petir"
};

// ====== Helper (arrow functions) ======
const $ = (selector) => document.querySelector(selector);
const makeId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
const esc = (text) => String(text).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const formatDate = (iso) => new Date(iso + "T00:00:00").toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
const offsetDate = (days) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
};

// ====== Class: model data ======
class TaskItem {
  constructor({ id = makeId(), title, course = "", deadline = "", priority = "medium", done = false }) {
    this.id = id;
    this.title = title;
    this.course = course;
    this.deadline = deadline;
    this.priority = priority;
    this.done = done;
  }

  get daysLeft() {
    if (!this.deadline) return null;
    const today = new Date(); today.setHours(0, 0, 0, 0);
    return Math.round((new Date(this.deadline + "T00:00:00") - today) / 86400000);
  }

  get isOverdue() { return !this.done && this.daysLeft !== null && this.daysLeft < 0; }

  // Mengembalikan objek baru (immutable)
  with(changes) { return new TaskItem({ ...this, ...changes }); }
}

class NoteItem {
  constructor({ id = makeId(), text }) {
    this.id = id;
    this.text = text;
  }
}

class ScheduleItem {
  constructor({ id = makeId(), course, day = "Senin", time = "", room = "" }) {
    this.id = id;
    this.course = course;
    this.day = day;
    this.time = time;
    this.room = room;
  }
}

// ====== Data Awal (Seed Data) ======
const getSeedData = () => ({
  tasks: [
    { title: "Praktikum Pertemuan 2: Personal Dashboard ES6+", course: "Pemrograman Web", deadline: offsetDate(0), priority: "high", done: false },
    { title: "Praktikum Pertemuan 5: Simulasi Cisco - HTTP, Server DHCP, Server DNS, Access Point, dan Routing", course: "Jaringan Komputer", deadline: offsetDate(3), priority: "high", done: false },
    { title: "Penulisan Artikel Kapita Selekta", course: "Kapita Selekta", deadline: offsetDate(5), priority: "medium", done: false },
    { title: "Kuis Keamanan Siber", course: "Keamanan Siber", deadline: offsetDate(-2), priority: "low", done: true }
  ],
  notes: [
    { text: "Buat catatan penting di sini." },
    { text: "Klik langsung pada teks catatan ini untuk mengedit isinya secara instan." },
    { text: "Jangan lupa sertakan screenshot dashboard di folder screenshot/ sebelum push ke repositori." },
    
  ],
  schedules: [
    { course: "Kapita Selekta(RD)", day: "Senin", time: "09.20-12.00", room: "GK2-207" },
    { course: "Inteligensi Buatan(RC)", day: "Senin", time: "13.00 - 15.40", room: "GK2-124" },
    { course: "Keamanan Siber", day: "Selasa", time: "13.00 - 15.40", room: "Lab IoT" }
  ]
});

// ====== Class: pengelola state, localStorage, dan API ======
class DashboardApp {
  constructor() {
    this.state = { tasks: [], notes: [], schedules: [], filter: "all", query: "" };
    this.load();
  }

  load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : getSeedData();
      const { tasks = [], notes = [], schedules = [] } = parsed ?? {};
      this.state = {
        ...this.state,
        tasks: tasks.map((t) => new TaskItem(t)),
        notes: notes.map((n) => new NoteItem(n)),
        schedules: schedules.map((s) => new ScheduleItem(s))
      };
      if (!raw) this.save();
    } catch (err) {
      console.warn("Data tersimpan rusak, memulai dari kosong.", err);
    }
  }

  save() {
    const { tasks, notes, schedules } = this.state;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ tasks, notes, schedules }));
  }

  resetToSeed() {
    localStorage.removeItem(STORAGE_KEY);
    this.load();
  }

  // --- Tugas ---
  addTask(data) {
    this.state = { ...this.state, tasks: [new TaskItem(data), ...this.state.tasks] };
    this.save();
  }
  updateTask(id, changes) {
    this.state = { ...this.state, tasks: this.state.tasks.map((t) => (t.id === id ? t.with(changes) : t)) };
    this.save();
  }
  deleteTask(id) {
    this.state = { ...this.state, tasks: this.state.tasks.filter((t) => t.id !== id) };
    this.save();
  }
  get visibleTasks() {
    const { tasks, filter, query } = this.state;
    const q = query.toLowerCase();
    const byFilter = { all: () => true, active: (t) => !t.done, done: (t) => t.done }[filter];
    return tasks
      .filter(byFilter)
      .filter(({ title, course }) => !q || title.toLowerCase().includes(q) || course.toLowerCase().includes(q))
      .sort((a, b) => (a.deadline || "9999").localeCompare(b.deadline || "9999"));
  }

  get stats() {
    return this.state.tasks.reduce(
      (acc, task) => ({
        total: acc.total + 1,
        active: acc.active + (!task.done ? 1 : 0),
        overdue: acc.overdue + (task.isOverdue ? 1 : 0),
        done: acc.done + (task.done ? 1 : 0)
      }),
      { total: 0, active: 0, overdue: 0, done: 0 }
    );
  }

  // --- Jadwal Kuliah ---
  addSchedule(data) {
    this.state = { ...this.state, schedules: [...this.state.schedules, new ScheduleItem(data)] };
    this.save();
  }
  deleteSchedule(id) {
    this.state = { ...this.state, schedules: this.state.schedules.filter((s) => s.id !== id) };
    this.save();
  }

  // --- Catatan ---
  addNote(text) {
    this.state = { ...this.state, notes: [new NoteItem({ text }), ...this.state.notes] };
    this.save();
  }
  updateNote(id, text) {
    this.state = { ...this.state, notes: this.state.notes.map((n) => (n.id === id ? new NoteItem({ id, text }) : n)) };
    this.save();
  }
  deleteNote(id) {
    this.state = { ...this.state, notes: this.state.notes.filter((n) => n.id !== id) };
    this.save();
  }

  // --- API (async/await) ---
  async fetchQuote() {
    const res = await fetch("https://dummyjson.com/quotes/random");
    if (!res.ok) throw new Error(`Kutipan gagal dimuat (${res.status})`);
    const { quote, author } = await res.json();
    return { quote, author };
  }

  async fetchWeather() {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${ITERA.lat}&longitude=${ITERA.lon}&current_weather=true`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Cuaca gagal dimuat (${res.status})`);
    const { current_weather: { temperature, windspeed, weathercode } } = await res.json();
    return { temperature, windspeed, label: WEATHER_CODES[weathercode] ?? "Tidak diketahui" };
  }
}

// ====== Render (template literals) ======
const app = new DashboardApp();

const renderStats = () => {
  const { total, active, overdue, done } = app.stats;
  $("#statTotal").textContent = total;
  $("#statActive").textContent = active;
  $("#statOverdue").textContent = overdue;
  $("#statDone").textContent = done;
  $("#taskCount").textContent = `${done} dari ${total} selesai`;
  $("#progress").style.width = total ? `${(done / total) * 100}%` : "0";
};

const renderTasks = () => {
  const list = app.visibleTasks;
  $("#taskList").innerHTML = list.length
    ? list.map(({ id, title, course, deadline, priority, done, daysLeft, isOverdue }) => `
      <li class="task ${done ? "done" : ""}" data-id="${id}">
        <input type="checkbox" data-action="toggle" aria-label="Tandai selesai: ${esc(title)}" ${done ? "checked" : ""}>
        <div>
          <div class="t-title-row">
            <span class="t-title">${esc(title)}</span>
            <span class="badge ${esc(priority)}">${PRIORITY_LABELS[priority] ?? "Sedang"}</span>
          </div>
          <div class="t-meta">
            ${course ? esc(course) : "Tanpa mata kuliah"}
            ${deadline ? ` · ${formatDate(deadline)}` : ""}
            ${isOverdue ? `<span class="late"> · terlambat ${Math.abs(daysLeft)} hari</span>` : ""}
            ${!done && daysLeft === 0 ? `<span class="late"> · hari ini</span>` : ""}
          </div>
        </div>
        <div class="actions">
          <button class="btn small" data-action="edit">Edit</button>
          <button class="btn small danger" data-action="delete">Hapus</button>
        </div>
      </li>`).join("")
    : `<li class="empty">Tidak ada tugas yang cocok dengan filter atau pencarian.</li>`;

  renderStats();
};

const renderSchedules = () => {
  const { schedules } = app.state;
  $("#scheduleCount").textContent = `${schedules.length} mata kuliah`;
  $("#scheduleList").innerHTML = schedules.length
    ? schedules.map(({ id, course, day, time, room }) => `
      <li class="schedule-item" data-id="${id}">
        <div>
          <div class="t-title">
            <span class="day-tag">${esc(day)}</span>${esc(course)}
          </div>
          <div class="t-meta">${esc(time)}${room ? ` · Ruang ${esc(room)}` : ""}</div>
        </div>
        <button class="btn small danger" data-action="delete-schedule">Hapus</button>
      </li>`).join("")
    : `<li class="empty">Belum ada jadwal kuliah.</li>`;
};

const renderNotes = () => {
  const { notes } = app.state;
  $("#noteList").innerHTML = notes.length
    ? notes.map(({ id, text }) => `
      <li class="note" data-id="${id}">
        <p contenteditable="true" data-action="edit-note" title="Klik untuk mengedit">${esc(text)}</p>
        <button class="btn small danger" data-action="delete-note">Hapus</button>
      </li>`).join("")
    : `<li class="empty">Belum ada catatan.</li>`;
};

const renderHeader = () => {
  const now = new Date();
  const hour = now.getHours();
  let part = "malam"; // let: nilainya berubah sesuai jam
  if (hour < 11) part = "pagi";
  else if (hour < 15) part = "siang";
  else if (hour < 18) part = "sore";
  $("#greeting").textContent = `Selamat ${part}!`;
  $("#today").textContent = now.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  $("#clock").textContent = now.toLocaleTimeString("id-ID", { hour12: false });
};

const renderAll = () => {
  renderTasks();
  renderSchedules();
  renderNotes();
};

// ====== Form tugas (tambah / edit / filter / cari) ======
const resetTaskForm = () => {
  $("#taskForm").reset();
  $("#taskId").value = "";
  $("#taskPriority").value = "medium";
  $("#taskSubmit").textContent = "Tambah tugas";
  $("#taskCancel").hidden = true;
};

$("#taskForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const id = $("#taskId").value;
  const data = {
    title: $("#taskTitle").value.trim(),
    course: $("#taskCourse").value.trim(),
    deadline: $("#taskDeadline").value,
    priority: $("#taskPriority").value
  };
  if (!data.title) return;
  id ? app.updateTask(id, data) : app.addTask(data);
  resetTaskForm();
  renderTasks();
});
$("#taskCancel").addEventListener("click", resetTaskForm);

$("#taskList").addEventListener("click", ({ target }) => {
  const action = target.dataset.action;
  const id = target.closest(".task")?.dataset.id;
  if (!action || !id) return;
  const task = app.state.tasks.find((t) => t.id === id);

  if (action === "toggle") app.updateTask(id, { done: !task.done });
  if (action === "delete" && confirm(`Hapus tugas "${task.title}"?`)) app.deleteTask(id);
  if (action === "edit") {
    const { title, course, deadline, priority } = task;
    $("#taskId").value = id;
    $("#taskTitle").value = title;
    $("#taskCourse").value = course;
    $("#taskDeadline").value = deadline;
    $("#taskPriority").value = priority;
    $("#taskSubmit").textContent = "Simpan perubahan";
    $("#taskCancel").hidden = false;
    $("#taskTitle").focus();
  }
  renderTasks();
});

document.querySelectorAll(".chip").forEach((chip) =>
  chip.addEventListener("click", () => {
    document.querySelectorAll(".chip").forEach((c) => c.classList.toggle("active", c === chip));
    app.state = { ...app.state, filter: chip.dataset.filter };
    renderTasks();
  })
);

$("#taskSearch").addEventListener("input", ({ target }) => {
  app.state = { ...app.state, query: target.value.trim() };
  renderTasks();
});

// ====== Jadwal Kuliah ======
$("#scheduleForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const data = {
    course: $("#schedCourse").value.trim(),
    day: $("#schedDay").value,
    time: $("#schedTime").value.trim(),
    room: $("#schedRoom").value.trim()
  };
  if (!data.course) return;
  app.addSchedule(data);
  e.target.reset();
  renderSchedules();
});

$("#scheduleList").addEventListener("click", ({ target }) => {
  if (target.dataset.action !== "delete-schedule") return;
  app.deleteSchedule(target.closest(".schedule-item").dataset.id);
  renderSchedules();
});

// ====== Catatan ======
$("#noteForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const text = $("#noteText").value.trim();
  if (!text) return;
  app.addNote(text);
  e.target.reset();
  renderNotes();
});

$("#noteList").addEventListener("click", ({ target }) => {
  if (target.dataset.action !== "delete-note") return;
  app.deleteNote(target.closest(".note").dataset.id);
  renderNotes();
});

$("#noteList").addEventListener("focusout", ({ target }) => {
  if (target.dataset.action !== "edit-note") return;
  const text = target.textContent.trim();
  const id = target.closest(".note").dataset.id;
  text ? app.updateNote(id, text) : app.deleteNote(id);
  renderNotes();
});

$("#resetSeedBtn").addEventListener("click", () => {
  if (confirm("Muat ulang data contoh? Data saat ini akan diganti dengan data awal.")) {
    app.resetToSeed();
    renderAll();
  }
});

// ====== Data eksternal (Promise.allSettled) ======
const loadExternal = async () => {
  const [quote, weather] = await Promise.allSettled([app.fetchQuote(), app.fetchWeather()]);

  if (quote.status === "fulfilled") {
    $("#quoteText").textContent = `“${quote.value.quote}”`;
    $("#quoteAuthor").textContent = quote.value.author;
  } else {
    $("#quoteText").textContent = "Kutipan tidak dapat dimuat. Periksa koneksi internet.";
  }

  if (weather.status === "fulfilled") {
    const { temperature, windspeed, label } = weather.value;
    $("#weather").innerHTML = `
      <div class="temp">${temperature}°C</div>
      <div><strong>${label}</strong></div>
      <div class="muted">Angin ${windspeed} km/jam · Kampus ITERA, Lampung Selatan</div>`;
  } else {
    $("#weather").textContent = "Cuaca tidak dapat dimuat. Periksa koneksi internet.";
  }
};

// ====== Mulai ======
renderHeader();
setInterval(renderHeader, 1000);
renderAll();
loadExternal();
