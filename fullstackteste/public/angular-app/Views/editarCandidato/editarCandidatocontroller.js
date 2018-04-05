angular.module('fullstack').controller('editarCandidatocontroller', editarCandidatocontroller);

function editarCandidatocontroller(debateFactory,$scope,$routeParams,$timeout,$location){
    var vm = this;
    var _id = $routeParams.id;

    vm.reload = function(){
      console.log(_id);
      debateFactory.getCandidato(_id).then(function(response){
        vm.candidato = response.data;
      });
    };

    vm.editarCandidato = function(){
      document.getElementById("nome").value     = vm.candidato.nome;
      document.getElementById("cpf").value      = vm.candidato.cpf;
      document.getElementById("telefone").value = vm.candidato.telefone;
      document.getElementById("endereco").value = vm.candidato.endereco;
      document.getElementById("sexo").value     = vm.candidato.sexo;
      document.getElementById("idade").value    = vm.candidato.idade;
    };

    vm.hideError = function(){
      vm.hideLoader = false;
      $timeout(function(){
          vm.hideLoader = true;
          vm.erro="";
          vm.message="";
      }, 2000);
    };

    vm.hideOk = function(){
      vm.hideLoader = false;
      $timeout(function(){
          //$location.path('/');
          vm.hideLoader = true;
          vm.erro="";
          vm.message="";
      }, 2500);
    };

    vm.validarCampo = function(info){
      if (info == "" || info == undefined){
        return true;
      }else {
        return false;
      }
    };

    vm.validarLetras = function(info){
      const regExp = new RegExp(/^[0-9]+$/);
      if (regExp.test(info)) {
        return true;
      } else {
        return false;
      }
    };

    vm.validarNumeros = function(info){
      const regExp = new RegExp(/^[a-zA-Z]+$/);
      if (regExp.test(info)) {
        return true;
      } else {
        return false;
      }
    };

    vm.atualizarCandidato = function(){
      var candidato = {
        _id                    : vm.candidato._id,
        nome                   : document.getElementById("nome").value,
        cpf                    : document.getElementById("cpf").value,
        telefone               : document.getElementById("telefone").value,
        endereco               : document.getElementById("endereco").value,
        sexo                   : document.getElementById("sexo").value,
        idade                  : document.getElementById("idade").value
      };
      if (vm.validarCampo(candidato.nome)){
        vm.error="Preencha o campo Nome para continuar.";
        vm.hideError();
      }else if (vm.validarLetras(candidato.nome)) {
        vm.error="O Campo nome deve conter somente Letras.";
        vm.hideError();
      }else {
        if (vm.validarCampo(candidato.cpf)){
          vm.error="Preencha o campo CPF para continuar.";
          vm.hideError();
        }else if (vm.validarNumeros(candidato.cpf)) {
          vm.error="O Campo CPF deve conter somente Numeros.";
          vm.hideError();
        }else {
          if (vm.validarCampo(candidato.telefone)){
            vm.error="Preencha o campo Telefone para continuar.";
            vm.hideError();
          }else if (vm.validarNumeros(candidato.telefone)) {
            vm.error="O Campo Telefone deve conter somente Numeros.";
            vm.hideError();
          }else {

            console.log(candidato);
            debateFactory.atualizarCandidato(candidato).then(function(response){
              //vm.adm = response.data.adm;
            });

            vm.limpaCampos();
            vm.message = "Candidato Atualizado com Sucesso.";
            vm.error = "";
            vm.hideOk();
            $timeout(function(){
                vm.reload();
            }, 400);
            vm.reload();
          }
        }
      }
    };

    vm.limpaCampos = function(){
      document.getElementById("nome").value     = "";
      document.getElementById("cpf").value      = "";
      document.getElementById("telefone").value = "";
      document.getElementById("endereco").value = "";
      document.getElementById("sexo").value     = "";
      document.getElementById("idade").value    = "";
    };

    vm.deletarCandidato = function(_id){
      debateFactory.deletarCandidato(_id).then(function(response){
        //vm.adm = response.data.adm;
      });
      vm.message = "Candidato Deletado.";
      vm.error = "";
      vm.hideOk();
      $timeout(function(){
          $location.path('/listaCandidatos');
      }, 2000);
    };

    vm.reload();

};
