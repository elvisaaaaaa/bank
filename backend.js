const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Conectar a MongoDB
mongoose.connect('mongodb://localhost/mybank');

// Definir el esquema de una cuenta
const accountSchema = new mongoose.Schema({
  accountNumber: String,
  balance: Number
});

const Account = mongoose.model('Account', accountSchema);

// Ruta para obtener todas las cuentas
app.get('/api/accounts', async (req, res) => {
  const accounts = await Account.find();
  res.json(accounts);
});