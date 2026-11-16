# ==============================================================================
# Berkas: latihan_notifikasi.py
# Deskripsi: Latihan Mandiri 5 - Engine Dispatcher Multi-Saluran Notifikasi
# ==============================================================================

class NotifikasiEmail:
    def __init__(self, alamat_email: str):
        self.penerima_default = alamat_email

    def kirim(self, pesan: str, penerima: str = None):
        target = penerima or self.penerima_default
        print(f"[EMAIL] Mengirim ke {target} | Subjek: Pengumuman Darurat | Isi: '{pesan}'")


class NotifikasiSMS:
    def __init__(self, nomor_hp: str):
        self.penerima_default = nomor_hp

    def kirim(self, pesan: str, penerima: str = None):
        target = penerima or self.penerima_default
        print(f"[SMS Gateway] Mengirim SMS ke {target} -> '{pesan}'")


class NotifikasiWhatsApp:
    def __init__(self, nomor_wa: str):
        self.penerima_default = nomor_wa

    def kirim(self, pesan: str, penerima: str = None):
        target = penerima or self.penerima_default
        print(f"[WhatsApp API] Pesan WA terkirim ke {target} (Centang Biru): '{pesan}'")


def broadcast_pengumuman(daftar_channel: list, pesan: str, penerima: str = None):
    """Fungsi polimorfik untuk mengirim pesan siaran darurat ke seluruh kanal sekaligus"""
    print("=" * 70)
    print(f"SIARAN DARURAT: {pesan}")
    print("=" * 70)
    for channel in daftar_channel:
        # Memanggil method kirim(pesan, penerima) secara polimorfik (Duck Typing)
        channel.kirim(pesan, penerima)
    print("=" * 70)


# --- PROGRAM UTAMA (UJI COBA) ---
if __name__ == "__main__":
    email_notifier = NotifikasiEmail("mahasiswa@student.itera.ac.id")
    sms_notifier = NotifikasiSMS("0812-3456-7890")
    wa_notifier = NotifikasiWhatsApp("+62 812-3456-7890")

    semua_kanal = [email_notifier, sms_notifier, wa_notifier]

    # Kirim siaran ke masing-masing penerima default pada kanal
    broadcast_pengumuman(
        semua_kanal,
        "Server SIAKAD akan mengalami pemeliharaan pukul 23:00 WIB."
    )
