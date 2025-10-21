# Shoe Laundry API

## Deskripsi
Proyek ini merupakan REST API sederhana untuk layanan daftar barang cuci sepatu.  
API dibuat menggunakan **Node.js** dan **Express.js**, serta **Supabase** sebagai database.  
API ini memungkinkan pengguna melakukan pencatatan, pemantauan, dan pembaruan status cucian sepatu secara digital.

## Tujuan
- Mengimplementasikan **CRUD** (Create, Read, Update, Delete) melalui REST API.  
- Membuat backend sederhana menggunakan Express.js.  
- Menyediakan data sepatu dalam format JSON untuk kemudahan integrasi.  
- Mempermudah proses pencatatan cucian sepatu untuk kebutuhan bisnis nyata.

## Fitur Utama (Endpoints)

| Metode | Endpoint          | Deskripsi |
|--------|-----------------|-----------|
| GET    | /items           | Menampilkan semua sepatu yang sedang dicuci. |
| GET    | /items?status=Selesai | Menampilkan sepatu berdasarkan status tertentu (e.g., Selesai). |
| POST   | /items           | Menambahkan data sepatu baru. |
| PUT    | /items/:id       | Memperbarui status sepatu berdasarkan ID. |
| DELETE | /items/:id       | Menghapus data sepatu yang sudah selesai dicuci berdasarkan ID. |

## Struktur Data
Contoh objek data sepatu yang dikelola:

```json
{
  "id": 1,
  "nama": "Nike Air Force 1",
  "status": "Sedang Dicuci",
  "tanggalMasuk": "2025-10-08",
  "tanggalSelesai": "-"
}
Keterangan:

id → Nomor unik sepatu (Primary Key).
nama → Nama/merek sepatu.
status → Status cucian (Sedang Dicuci / Selesai).
tanggalMasuk → Tanggal sepatu diterima.
tanggalSelesai → Tanggal sepatu selesai dicuci (gunakan - jika belum selesai).

Contoh Request & Response
1. GET /items
Mendapatkan daftar semua sepatu.

Response:

json
Copy code
[
  {
    "id": 1,
    "nama": "Converse Chuck Taylor",
    "status": "Selesai",
    "tanggalMasuk": "2025-10-01",
    "tanggalSelesai": "2025-10-03"
  }
]
2. POST /items
Menambahkan data sepatu baru.

Body:

json
Copy code
{
  "nama": "Adidas",
  "status": "Sedang Dicuci",
  "tanggalMasuk": "2025-11-18",
  "tanggalSelesai": "-"
}
Response:

json
Copy code
{
  "message": "Data sepatu berhasil ditambahkan."
}
3. PUT /items/:id
Memperbarui status sepatu menjadi Selesai.

Body:

json
Copy code
{
  "status": "Selesai",
  "tanggalSelesai": "2025-10-09"
}
Response:

json
Copy code
{
  "message": "Status sepatu berhasil diperbarui."
}
4. DELETE /items/:id
Menghapus data sepatu.

Response:

json
Copy code
{
  "message": "Data sepatu berhasil dihapus."
}
🛠 Langkah Instalasi & Menjalankan API
Clone Repository

bash
Copy code
git clone https://github.com/Dhindachyaa/shoe-laundry-api-mod1
cd shoe-laundry-api-mod1
Install Dependencies

bash
Copy code
npm install
Konfigurasi Environment
Buat file .env.local di root folder proyek dan isi dengan variabel berikut:

ini
Copy code
SUPABASE_URL=<YOUR_SUPABASE_URL>
SUPABASE_KEY=<YOUR_SUPABASE_KEY>
PORT=3000
Ganti <YOUR_SUPABASE_URL> dan <YOUR_SUPABASE_KEY> dengan kredensial proyek Supabase Anda.

Jalankan Server Lokal

bash
Copy code
npm run dev
API akan berjalan di:

arduino
Copy code
http://localhost:3000
🌐 Link Deploy (Vercel)
Setelah deploy ke Vercel (atau platform lain), API dapat diakses di URL publik:
https://shoe-laundry-api-mod1.vercel.app/