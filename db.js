// backend/database/db.js

const mysql = require('mysql2/promise');

// Konfigurasi koneksi ke database
const connection = mysql.createPool({
  host: 'localhost',
  user: 'root', // Ganti dengan username Anda
  password: '', // Ganti dengan password Anda
  database: 'db_ipk' // Ganti dengan nama database Anda
});

module.exports = connection;
