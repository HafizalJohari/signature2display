# Signature Display System

Sistem ini membolehkan pengguna untuk menangkap tandatangan secara digital dan memaparkannya secara langsung dengan pelbagai kawalan untuk mengubah suai paparan tandatangan.

## Ciri-ciri

1. **Tangkap Tandatangan:**
   - Pengguna boleh menandatangani pada kanvas yang disediakan.
   - Saiz dan warna pen boleh diubah suai.

2. **Paparan Tandatangan:**
   - Tandatangan dipaparkan secara langsung pada skrin dengan pelbagai kesan animasi.
   - Nama yang ditandatangani akan dipaparkan bersama tandatangan.

3. **Kawalan Paparan:**
   - Pengguna boleh mengubah saiz tandatangan, warna tandatangan, durasi animasi, jenis animasi, bilangan nama yang dipaparkan, bilangan ulangan, warna latar belakang, saiz fon nama, warna fon nama, dan jenis fon nama.

## Keperluan

- Node.js
- Express.js
- Multer
- WebSocket

## Pemasangan

1. **Klon Repositori:**

    ```bash
    git clone https://github.com/username/signature-display-system.git
    cd signature-display-system
    ```

2. **Pasang Kebergantungan:**

    ```bash
    npm install
    ```

3. **Konfigurasi SSL (untuk HTTP/2):**

    Pastikan anda mempunyai kunci peribadi dan sijil untuk pelayan anda. Letakkan fail `private-key.pem` dan `certificate.pem` dalam direktori projek anda.

## Penggunaan

1. **Jalankan Pelayan:**

    ```bash
    node server.js
    ```

2. **Akses Halaman:**

    - Halaman Tangkapan Tandatangan: `http://localhost:3001`
    - Halaman Paparan Tandatangan: `http://localhost:3001/display-signature`
    - Halaman Kawalan: `http://localhost:3001/controls`

## Struktur Projek

- `server.js`: Fail pelayan utama yang mengendalikan HTTP/2 dan WebSocket.
- `public/index.html`: Halaman untuk menangkap tandatangan.
- `public/display-signature.html`: Halaman untuk memaparkan tandatangan dengan animasi.
- `public/controls.html`: Halaman untuk mengawal parameter paparan tandatangan.
- `public/signatures/`: Direktori untuk menyimpan imej tandatangan yang ditangkap.

## Ciri-ciri Masa Depan

- Tambah lebih banyak pilihan animasi.
- Menyokong lebih banyak jenis fon.
- Integrasi dengan pangkalan data untuk menyimpan sejarah tandatangan.

## Lesen

Projek ini dilindungi di bawah lesen MIT. Lihat fail `LICENSE` untuk maklumat lanjut.

