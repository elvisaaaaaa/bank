const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');

const app = express();

// Conectar a MongoDB
mongoose.connect('mongodb://localhost/mybank');

// Definir el esquema de una cuenta
const accountSchema = new mongoose.Schema({
  accountNumber: { type: String, required: true, unique: true },
  balance: { type: Number, required: true, min: 0 }
});

const Account = mongoose.model('Account', accountSchema);

// Esquema de validación
const accountSchemaValidation = Joi.object({
  accountNumber: Joi.string().required(),
  balance: Joi.number().required().min(0)
});

// Ruta para obtener todas las cuentas
app.get('/api/accounts', async (req, res) => {
  try {
    const accounts = await Account.find();
    res.json(accounts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las cuentas' });
  }
});

// Ruta para crear una cuenta
app.post('/api/accounts', async (req, res) => {
  try {
    const { error } = accountSchemaValidation.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const account = new Account(req.body);
    await account.save();
    res.status(201).json(account);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear la cuenta' });
  }
});

// ... y así sucesivamente para las demás rutas CRUD

app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});

