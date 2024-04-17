// backend/server.js

const express = require('express');
const bodyParser = require('body-parser');
const db = require('db.js'); // Sesuaikan dengan lokasi file database Anda

const app = express();
const PORT = process.env.MYSQLPORT || 51651;

// Middleware
app.use(bodyParser.json());

// Endpoint untuk mendapatkan data mahasiswa berdasarkan NIM
app.get('/mahasiswa/:nim', (req, res) => {
    const { nim } = req.params;
    const query = 'SELECT * FROM mahasiswa WHERE nim = ?';
    
    db.query(query, [nim], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            if (result.length > 0) {
                res.json(result[0]);
            } else {
                res.status(404).json({ error: 'Mahasiswa tidak ditemukan' });
            }
        }
    });
});

// Endpoint untuk menghitung IPK berdasarkan NIM
app.get('/mahasiswa/:nim/ipk', (req, res) => {
    const { nim } = req.params;
    const query = `
        SELECT 
            NIM,
            SUM(CASE 
                WHEN krs.nilai <= 80 THEN 4 * mata_kuliah.sks
                WHEN krs.nilai <= 60 THEN 3 * mata_kuliah.sks
                WHEN krs.nilai <= 40 THEN 2 * mata_kuliah.sks
                ELSE 0
            END) / SUM(sks) AS IPK
        FROM 
            krs
        JOIN 
            mata_kuliah ON krs.id_mk = mata_kuliah.id_mk
        WHERE 
            NIM = ?
        GROUP BY 
            NIM;
    `;

    db.query(query, [nim], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            if (result.length > 0) {
                res.json(result[0]);
            } else {
                res.status(404).json({ error: 'Mahasiswa tidak ditemukan' });
            }
        }
    });
});

// Jalankan server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
