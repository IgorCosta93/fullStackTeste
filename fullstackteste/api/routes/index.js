var express = require('express');
var router = express.Router();

var ctrlCandidato     = require('../controllers/candidato.controller.js');

router
  .route('/candidato')
  .post(ctrlCandidato.addCandidato)
  .get(ctrlCandidato.getCandidatos)
  .put(ctrlCandidato.atualizarCandidato);

router
  .route('/candidatoCPF/:cpf')
  .get(ctrlCandidato.getCPF);

router
  .route('/candidato/:id')
  .delete(ctrlCandidato.deletarCandidato);

router
  .route('/candidato/:id')
  .get(ctrlCandidato.getCandidato);

router
  .route('/login')
  .post(ctrlCandidato.login);


module.exports = router;
