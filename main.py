from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware # Penting untuk menghubungkan Front-End
from pydantic import BaseModel
import tensorflow as tf
import joblib
import pandas as pd
import numpy as np

# Inisialisasi aplikasi FastAPI
app = FastAPI()

# --- Mengatasi CORS (Cross-Origin Resource Sharing) ---
# Ini agar Front-End SolidJS (yang berjalan di port berbeda) bisa mengakses API ini
origins = [
    "http://localhost",
    "http://localhost:3000", # Asumsi SolidJS berjalan di port 3000
    "http://localhost:5173", # Port default untuk Vite (cara umum membuat app SolidJS)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Memuat Model dan Scaler (hanya sekali saat startup) ---
try:
    model = tf.keras.models.load_model("diabetes_model.keras")
    scaler = joblib.load("scaler.pkl")
    # Nama kolom sesuai saat training
    feature_names = ['gender', 'age', 'hypertension', 'heart_disease', 'smoking_history', 'bmi', 'HbA1c_level', 'blood_glucose_level']
    print("Model dan Scaler berhasil dimuat.")
except Exception as e:
    model = None
    scaler = None
    print(f"Gagal memuat model atau scaler: {e}")

# --- Mendefinisikan struktur data input dengan Pydantic ---
# Ini memastikan data yang dikirim dari Front-End memiliki format yang benar
class PatientData(BaseModel):
    gender: int
    age: float
    hypertension: int
    heart_disease: int
    smoking_history: int
    bmi: float
    HbA1c_level: float
    blood_glucose_level: int

# --- Membuat Endpoint API ---
@app.post("/predict")
async def predict_diabetes(data: PatientData):
    if model is None or scaler is None:
        return {"error": "Model atau scaler tidak berhasil dimuat"}

    # Ubah data input menjadi DataFrame agar sesuai format training
    input_df = pd.DataFrame([data.model_dump()], columns=feature_names)
    
    # Scaling data
    input_scaled = scaler.transform(input_df)

    # Lakukan prediksi
    prediction_proba = model.predict(input_scaled)[0][0]
    
    # Tentukan label berdasarkan probabilitas
    label = "Berisiko Tinggi Diabetes" if prediction_proba > 0.5 else "Berisiko Rendah Diabetes"

    # Kirim hasil kembali dalam format JSON
    return {
        "prediction_label": label,
        "probability": float(prediction_proba)
    }

@app.get("/")
def read_root():
    return {"message": "API Prediksi Diabetes aktif"}