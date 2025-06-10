# Capstone-Project_CC25-CR388

Prediktor Risiko Diabetes Berbasis Jaringan Saraf Tiruan

Sebuah proyek full-stack machine learning untuk memprediksi risiko penyakit diabetes pada pasien berdasarkan beberapa atribut kesehatan. Proyek ini mencakup model deep learning yang dibangun dengan TensorFlow, disajikan melalui API back-end yang dibuat dengan FastAPI, dan diakses melalui antarmuka web interaktif yang dibangun dengan SolidJS.

📖 Deskripsi Proyek
Tujuan utama proyek ini adalah membangun sebuah model klasifikasi biner yang andal untuk membantu dalam deteksi dini penyakit diabetes. Model ini dilatih pada dataset yang berisi 8 fitur kesehatan utama. Salah satu fokus utama dalam pengembangan model adalah memaksimalkan metrik recall untuk kelas positif (penderita diabetes), guna meminimalkan risiko kasus yang terlewatkan (false negatives), yang sangat krusial dalam konteks medis.

Proyek ini mencakup seluruh alur kerja data science, mulai dari pembersihan data, preprocessing, pelatihan model, evaluasi, hingga deployment sebagai aplikasi web yang fungsional.

✨ Fitur Utama
Model Deep Learning: Menggunakan arsitektur Jaringan Saraf Tiruan (Neural Network) dengan TensorFlow dan Keras.
Penanganan Data Tidak Seimbang: Implementasi teknik class_weight untuk meningkatkan performa model pada kelas minoritas, menghasilkan recall sebesar 91%.
API Back-end: Server API yang efisien dibangun menggunakan FastAPI untuk melayani permintaan prediksi.
Antarmuka Web Interaktif: Front-end yang responsif dan mudah digunakan dibangun dengan SolidJS, memungkinkan pengguna memasukkan data dan menerima hasil prediksi secara real-time.
Arsitektur Client-Server: Pemisahan yang jelas antara logika machine learning (Back-End) dan antarmuka pengguna (Front-End).
🏗️ Arsitektur Proyek
Proyek ini terdiri dari dua komponen utama yang berjalan secara terpisah:

Back-End (API Server - diabetes_api):

Ditulis dalam Python menggunakan framework FastAPI.
Bertanggung jawab untuk memuat model TensorFlow (.keras) dan scaler (.pkl) yang sudah dilatih.
Menyediakan endpoint /predict yang menerima data pasien dalam format JSON.
Melakukan preprocessing pada data input (scaling) dan mengembalikannya ke model untuk prediksi.
Mengirimkan hasil prediksi (label dan probabilitas) kembali ke front-end.
Front-End (Web App - diabetes-webapp-jsx):

Ditulis dalam JavaScript menggunakan framework SolidJS.
Menampilkan form interaktif bagi pengguna untuk memasukkan 8 fitur kesehatan.
Mengirim data dari form ke endpoint API di back-end saat tombol "Dapatkan Prediksi" diklik.
Menerima dan menampilkan hasil prediksi yang mudah dibaca oleh pengguna.
💻 Teknologi yang Digunakan
Back-End & Machine Learning:

Python 3.11
TensorFlow / Keras
Scikit-learn
Pandas & NumPy
FastAPI
Uvicorn
Front-End:

SolidJS
Vite
JavaScript (JSX)
HTML/CSS
🚀 Panduan Instalasi dan Menjalankan
Untuk menjalankan proyek ini secara lokal, Anda perlu menjalankan Back-End dan Front-End secara terpisah di dua terminal yang berbeda.

1. Menjalankan Back-End (Server API)
Navigasi ke Folder Proyek Utama.

Bash

cd /path/to/your/Capstone Project
Buat dan Aktifkan Virtual Environment:

Pastikan Anda memiliki Python 3.11 terinstal.
<!-- end list -->

Bash

py -3.11 -m venv venv
.\venv\Scripts\activate
Install Dependensi Python:

Bash

pip install "fastapi[all]" uvicorn tensorflow scikit-learn joblib pandas
Pastikan File Model Ada:

Pastikan file diabetes_model.keras dan scaler.pkl berada di direktori utama proyek.
Jalankan Server API:

Bash

uvicorn main:app --reload
Server akan berjalan di http://127.0.0.1:8000. Biarkan terminal ini tetap terbuka.

2. Menjalankan Front-End (Website SolidJS)
Buka Terminal BARU.

Navigasi ke Folder Front-End:

Bash

cd /path/to/your/Capstone Project/diabetes-webapp-jsx
Install Dependensi Node.js (jika belum):

Bash

npm install
Jalankan Server Pengembangan Front-End:

Bash

npm run dev
Server akan memberikan URL, biasanya http://localhost:5173.

Buka Aplikasi:

Buka URL (http://localhost:5173) di browser Anda.
Anda sekarang dapat berinteraksi dengan form, memasukkan data, dan mendapatkan hasil prediksi langsung dari model Anda.
