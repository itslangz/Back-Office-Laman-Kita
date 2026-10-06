# 🌐 BOLATA (Back Office LAman Kita) - Static Web View

Versi statis lengkap dari aplikasi **BOLATA (Back Office LAman Kita)** yang siap di-hosting langsung di **GitHub Pages** tanpa memerlukan server PHP atau database MySQL.

---

## 🚀 Fitur Utama Versi Statis

1. **100% Siap GitHub Pages**: Seluruh aset (CSS, JS, gambar) menggunakan relative path sehingga tidak akan error/broken saat diakses di subdirektori repositori GitHub (contoh: `https://username.github.io/bolata/`).
2. **Mencakup Semua 15 Tampilan BOLATA**:
   - 🔑 **Halaman Login** (`index.html`) dengan tombol login cepat & Remember Me
   - 👤 **Dashboard Pegawai (Single Page Layout)** (`user-dashboard.html`) dengan section Hero Maskot, Counter Fitur, Section Tim, dan Section Inovasi
   - 🛡️ **Dashboard Admin** (`admin-dashboard.html`) dengan 4 Kartu Statistik dan Tabel User Terbaru
   - 👥 **Kelola User (Index)** (`admin-users.html`)
   - ➕ **Tambah User (Form)** (`admin-user-create.html`)
   - ✏️ **Edit User (Form)** (`admin-user-edit.html`)
   - 🏢 **Kelola Tim (Index)** (`admin-teams.html`)
   - ➕ **Tambah Tim (Form)** (`admin-team-create.html`)
   - ✏️ **Edit Tim (Form)** (`admin-team-edit.html`)
   - 🔗 **Kelola Link Tim (Index)** (`admin-links.html`)
   - ➕ **Tambah Link Tim (Form)** (`admin-link-create.html`)
   - ✏️ **Edit Link Tim (Form)** (`admin-link-edit.html`)
   - 💡 **Kelola Link Inovasi (Index)** (`admin-innovation-links.html`)
   - ➕ **Tambah Link Inovasi (Form)** (`admin-innovation-link-create.html`)
   - ✏️ **Edit Link Inovasi (Form)** (`admin-innovation-link-edit.html`)
3. **⚡ Demo Navigator Dock**:
   Widget melayang di kanan bawah layar untuk berpindah ke 15 tampilan manapun secara instan, mengganti peran aktif (Admin, Budi TI, Siti Keuangan), dan mereset data demo kapan saja.
4. **💾 Interactive Client Data Store (`LocalStorage`)**:
   Data awal bersumber dari seeder resmi BOLATA. Penguji dapat mencoba aksi Tambah (Create), Edit (Update), dan Hapus (Delete) secara nyata di browser. Data akan tersimpan di LocalStorage browser.

---

## 📁 Struktur Berkas

```
bolata-static/
├── .nojekyll                           # Mencegah GitHub memproses Jekyll
├── README.md                           # Dokumentasi panduan
├── index.html                          # Halaman Login / Pintu Masuk
├── user-dashboard.html                 # Dashboard Single-Page Pegawai
├── admin-dashboard.html                # Dashboard Admin
├── admin-users.html                    # Kelola User
├── admin-user-create.html              # Form Tambah User
├── admin-user-edit.html                # Form Edit User
├── admin-teams.html                    # Kelola Tim
├── admin-team-create.html              # Form Tambah Tim
├── admin-team-edit.html                # Form Edit Tim
├── admin-links.html                    # Kelola Link Tim
├── admin-link-create.html              # Form Tambah Link Tim
├── admin-link-edit.html                # Form Edit Link Tim
├── admin-innovation-links.html         # Kelola Link Inovasi
├── admin-innovation-link-create.html   # Form Tambah Link Inovasi
├── admin-innovation-link-edit.html     # Form Edit Link Inovasi
├── css/
│   ├── app.css                         # Stylesheet utama BOLATA
│   └── demo-dock.css                   # Stylesheet untuk Demo Navigator Dock
├── js/
│   ├── app.js                          # Logika interaksi UI & navigasi
│   ├── data-store.js                   # Mock store & CRUD LocalStorage
│   └── demo-dock.js                    # Floating Demo Navigator
└── images/
    ├── bg-bottom.png                   # Background wave hero
    ├── logobps.png                     # Logo BPS resmi
    └── maskot.png                      # Maskot BOLATA 3D
```

---

## 🛠️ Panduan Hosting ke GitHub Pages

### Opsi A: Buat Repositori Baru Khusus Static (Paling Direkomendasikan)

1. Buat repositori baru di akun GitHub Anda (misal: `bolata-view`).
2. Masuk ke folder `bolata-static` di komputer Anda via terminal / PowerShell:
   ```bash
   cd c:\laragon\www\bolata\bolata-static
   ```
3. Inisialisasi git dan push:
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit BOLATA static site"
   git branch -M main
   git remote add origin https://github.com/USERNAME/bolata-view.git
   git push -u origin main
   ```
4. Buka halaman repositori Anda di GitHub:
   - Klik **Settings** > **Pages** (di menu sebelah kiri).
   - Di bagian **Build and deployment**:
     - **Source**: Pilih `Deploy from a branch`
     - **Branch**: Pilih `main` dan folder `/ (root)`
     - Klik **Save**.
5. Tunggu 1–2 menit, website Anda akan aktif di:
   `https://USERNAME.github.io/bolata-view/`

---

### Opsi B: Menggunakan Branch `gh-pages` pada Repositori yang Sudah Ada

Jika Anda ingin menggabungkannya ke repo yang sudah ada:
```bash
cd c:\laragon\www\bolata\bolata-static
git init
git checkout -b gh-pages
git add .
git commit -m "deploy: static view to gh-pages"
git remote add origin https://github.com/USERNAME/NAMA-REPO.git
git push -u origin gh-pages -f
```
Lalu di Settings > Pages, pilih branch `gh-pages`.

---

## 🧪 Menguji Secara Lokal (Tanpa Internet)

Cukup klik dua kali berkas `index.html` pada File Explorer untuk membukanya langsung di browser (Chrome, Edge, Firefox, dll), atau gunakan ekstensi Live Server di VS Code.
