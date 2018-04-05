angular.module('fullstack').controller('candidatosListacontroller', candidatosListacontroller);

function candidatosListacontroller(debateFactory,$scope){
    var vm = this;

    vm.reload = function(){
      debateFactory.getCandidatos().then(function(response){
        vm.candidatos = response.data;
      });
    };

    vm.candidatoTeste = function(candidato){
      if (candidato.termoResponsabilidade == true){
        return true;
      }else {
        return false;
      }
    };

    vm.reload();

};
