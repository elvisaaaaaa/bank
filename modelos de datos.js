// Cliente
const clienteSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  ciudadOrigen: String,
  cuentas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cuenta' }]
});

// Cuenta
const cuentaSchema = new mongoose.Schema({
  tipo: String, // ahorros, corriente
  saldo: Number,
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente' },
  movimientos: [{
    fecha: Date,
    tipo: String, // consignación, retiro
    monto: Number
  }]
});
