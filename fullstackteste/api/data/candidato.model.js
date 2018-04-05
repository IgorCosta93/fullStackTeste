var mongoose = require('mongoose');

var candidatoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  cpf: {
    type: Number,
    unique: true,
    required: true
  },
  telefone: {
    type: Number,
    required: true
  },
  endereco : {
    type : String,
    required: false
  },
  sexo : {
    type : String,
    required: true
  },
  idade : {
    type : Number,
    required: false
  },
  termoResponsabilidade : {
    type : Boolean,
    required: false
  },
  usuario: {
    type: String,
    unique: true,
    required: true
  },
  senha: {
    type: String,
    required: true
  }
});

mongoose.model('Candidato', candidatoSchema);
