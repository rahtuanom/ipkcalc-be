// backend/server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import modul cors
const mahasiswaRoutes = require('./routes/mahasiswa');

const app = express();
const PORT = process.env.MYSQLPORT || 51651;

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', 'https://rahtuanom.github.io');
//     next();
// });

app.use(cors()); 
app.use(cors({
  origin: 'https://rahtuanom.github.io/' // Atur domain atau port yang diizinkan
}));
app.use(bodyParser.json());
app.use('/mahasiswa', mahasiswaRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
