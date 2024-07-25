const transactionSchema = new mongoose.Schema({
  fecha: Date,
  tipo: String, // ingreso, egreso, transferencia
  monto: Number,
  descripcion: String,
  cuentaOrigen: { type: mongoose.Schema.Types.ObjectId, ref: 'Cuenta' },
  cuentaDestino: { type: mongoose.Schema.Types.ObjectId, ref: 'Cuenta' }
});


const transactionSchema = new mongoose.Schema({
  fecha: Date,
  tipo: String, // ingreso, egreso, transferencia
  monto: Number,
  descripcion: String,
  cuentaOrigen: { type: mongoose.Schema.Types.ObjectId, ref: 'Cuenta' },
  cuentaDestino: { type: mongoose.Schema.Types.ObjectId, ref: 'Cuenta' }
});

