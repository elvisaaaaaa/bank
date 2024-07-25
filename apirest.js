const express = require('express');
const mongoose = require('mongoose');

const app = express();
mongoose.connect('mongodb://localhost/mybank');

const accountSchema = new mongoose.Schema({
  accountNumber: String,
  balance: Number
});

const Account = mongoose.model('Account', accountSchema);

// Crear una cuenta
app.post('/api/accounts', async (req, res) => {
  try {
    const { accountNumber, balance } = req.body;
    const newAccount = new Account({ accountNumber, balance });
    await newAccount.save();
    res.status(201).json(newAccount);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear la cuenta' });
  }
});

// Obtener todas las cuentas
app.get('/api/accounts', async (req, res) => {
  try {
    const accounts = await Account.find();
    res.json(accounts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las cuentas' });
  }
});

// Obtener una cuenta por ID
app.get('/api/accounts/:id', async (req, res) => {
  try {
    const account = await Account.findById(req.params.id);
    if (!account) {
      return res.status(404).json({ message: 'Cuenta no encontrada' });
    }
    res.json(account);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener la cuenta' });
  }
});

// Actualizar una cuenta
app.put('/api/accounts/:id', async (req, res) => {
  try {
    const { accountNumber, balance } = req.body;
    const account = await Account.findByIdAndUpdate(req.params.id, { accountNumber, balance }, { new: true });
    if (!account) {
      return res.status(404).json({ message: 'Cuenta no encontrada' });
    }
    res.json(account);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar la cuenta' });
  }
});

// Eliminar una cuenta
app.delete('/api/accounts/:id', async (req, res) => {
  try {
    const account = await Account.findByIdAndDelete(req.params.id);
    if (!account) {
      return res.status(404).json({ message: 'Cuenta no encontrada' });
    }
    res.json({ message: 'Cuenta eliminada' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar la cuenta' });
  }
});

// ... y así sucesivamente para otras funcionalidades como transacciones

app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});
