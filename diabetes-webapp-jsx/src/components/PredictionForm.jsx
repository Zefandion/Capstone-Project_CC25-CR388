import { createSignal } from 'solid-js';

export default function PredictionForm() {
  const [gender, setGender] = createSignal('0');
  const [age, setAge] = createSignal(50);
  const [hypertension, setHypertension] = createSignal('0');
  const [heartDisease, setHeartDisease] = createSignal('0');
  const [smokingHistory, setSmokingHistory] = createSignal('4');
  const [bmi, setBmi] = createSignal(25.0);
  const [hba1c, setHba1c] = createSignal(5.7);
  const [glucose, setGlucose] = createSignal(100);
  const [result, setResult] = createSignal(null);
  const [loading, setLoading] = createSignal(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const patientData = {
      gender: parseInt(gender(), 10),
      age: parseFloat(age()),
      hypertension: parseInt(hypertension(), 10),
      heart_disease: parseInt(heartDisease(), 10),
      smoking_history: parseInt(smokingHistory(), 10),
      bmi: parseFloat(bmi()),
      HbA1c_level: parseFloat(hba1c()),
      blood_glucose_level: parseInt(glucose(), 10),
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(patientData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Gagal mengambil data prediksi:', error);
      setResult({ error: 'Tidak dapat terhubung ke server prediksi.' });
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: { "max-width": '600px', margin: '2rem auto', padding: '2rem', "border-radius": '8px', "box-shadow": '0 4px 12px rgba(0,0,0,0.1)', "font-family": 'sans-serif' },
    formGrid: { display: 'grid', "grid-template-columns": '1fr 1fr', gap: '1rem' },
    formItem: { display: 'flex', "flex-direction": 'column' },
    label: { "margin-bottom": '0.5rem', "font-weight": 'bold', color: '#333' },
    input: { padding: '0.5rem', "border-radius": '4px', border: '1px solid #ccc' },
    button: { "grid-column": '1 / -1', padding: '0.75rem', "font-size": '1rem', color: 'white', background: '#007BFF', border: 'none', "border-radius": '4px', cursor: 'pointer' },
    resultBox: { "margin-top": '1.5rem', padding: '1rem', background: '#f4f4f4', "border-radius": '8px', "border-left": '5px solid #007BFF' }
  };

  return (
    <div style={styles.container}>
      <h1 style={{ "text-align": 'center', color: '#222' }}>Prediktor Risiko Diabetes</h1>
      <form onSubmit={handleSubmit} style={styles.formGrid}>
        <div style={styles.formItem}>
          <label style={styles.label}>Jenis Kelamin</label>
          <select style={styles.input} value={gender()} onChange={(e) => setGender(e.target.value)}>
            <option value="0">Female</option>
            <option value="1">Male</option>
            <option value="2">Other</option>
          </select>
        </div>
        <div style={styles.formItem}>
          <label style={styles.label}>Riwayat Merokok</label>
          <select style={styles.input} value={smokingHistory()} onChange={(e) => setSmokingHistory(e.target.value)}>
            <option value="4">never</option>
            <option value="0">No Info</option>
            <option value="1">current</option>
            <option value="3">former</option>
            <option value="2">ever</option>
            <option value="5">not current</option>
          </select>
        </div>
        <div style={styles.formItem}>
          <label style={styles.label}>Usia: {age()}</label>
          <input type="range" min="0" max="100" value={age()} onInput={(e) => setAge(e.target.value)} />
        </div>
        <div style={styles.formItem}>
           <label style={styles.label}>Indeks Massa Tubuh (BMI)</label>
           <input type="number" step="0.1" value={bmi()} onInput={(e) => setBmi(e.target.value)} style={styles.input} />
        </div>
        <div style={styles.formItem}>
           <label style={styles.label}>Kadar HbA1c</label>
           <input type="number" step="0.1" value={hba1c()} onInput={(e) => setHba1c(e.target.value)} style={styles.input} />
        </div>
        <div style={styles.formItem}>
           <label style={styles.label}>Kadar Gula Darah</label>
           <input type="number" value={glucose()} onInput={(e) => setGlucose(e.target.value)} style={styles.input} />
        </div>
        <div style={styles.formItem}>
           <label style={styles.label}>Hipertensi</label>
           <select style={styles.input} value={hypertension()} onChange={(e) => setHypertension(e.target.value)}>
             <option value="0">Tidak</option>
             <option value="1">Ya</option>
           </select>
        </div>
        <div style={styles.formItem}>
           <label style={styles.label}>Penyakit Jantung</label>
           <select style={styles.input} value={heartDisease()} onChange={(e) => setHeartDisease(e.target.value)}>
             <option value="0">Tidak</option>
             <option value="1">Ya</option>
           </select>
        </div>
        <button type="submit" disabled={loading()} style={styles.button}>
          {loading() ? 'Memproses...' : 'Dapatkan Prediksi'}
        </button>
      </form>
      {result() && (
        <div style={styles.resultBox}>
          <h3 style={{ "margin-top": 0 }}>Hasil Prediksi:</h3>
          {result().error ? (
            <p style={{ color: 'red' }}>{result().error}</p>
          ) : (
            <>
              <p style={{ "font-size": '1.2rem', "font-weight": 'bold', color: result().probability > 0.5 ? 'red' : 'green' }}>
                {result().prediction_label}
              </p>
              <p>Probabilitas (Risiko Tinggi): <b>{(result().probability * 100).toFixed(2)}%</b></p>
            </>
          )}
        </div>
      )}
    </div>
  );
}