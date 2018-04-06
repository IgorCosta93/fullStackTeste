angular.module('fullstack').factory('debateFactory', debateFactory);

function debateFactory($http){
  return {
    addCandidato        : addCandidato,
    getCandidatos       : getCandidatos,
    getCandidato        : getCandidato,
    atualizarCandidato  : atualizarCandidato,
    deletarCandidato    : deletarCandidato,
    getCPF              : getCPF

  };

  function addCandidato(candidato){
    return $http.post('/api/candidato', candidato).then(complete).catch(failed);
  }

  function getCandidatos(){
    return $http.get('/api/candidato').then(complete).catch(failed);
  }

  function getCandidato(id){
    return $http.get('/api/candidato/' + id).then(complete).catch(failed);
  }

  function getCPF(cpf){
    return $http.get('/api/candidatoCPF/'+cpf).then(complete).catch(failed);
  }

  function atualizarCandidato(candidato){
    return $http.put('/api/candidato', candidato).then(complete).catch(failed);
  }

  function deletarCandidato(id){
    return $http.delete('/api/candidato/'+id).then(complete).catch(failed);
  }

  function complete(response){
    return response;
  }

  function failed(error){
    console.log(error.statusText);
  }
}
