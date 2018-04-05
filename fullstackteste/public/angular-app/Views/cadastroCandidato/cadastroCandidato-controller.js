angular.module('fullstack').controller('cadastroCandidatocontroller', cadastroCandidatocontroller);

function cadastroCandidatocontroller($http,$scope,$location,$timeout,debateFactory){
  var vm   = this;
  vm.termo = false;
  vm.sexo  = "Masculino";

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

  vm.cxTermo = function(){
    if (vm.termo == false){
      vm.termo = true;
    }else {
      vm.termo = false;
    }
  };

  vm.rdSexo = function(sexo){
    vm.sexo = sexo;
  };

  vm.cadastrar = function(){
    if (vm.validarCampo(vm.nome)){
      vm.error="Preencha o campo Nome para continuar.";
      vm.hideError();
    }else if (vm.validarLetras(vm.nome)) {
      vm.error="O Campo nome deve conter somente Letras.";
      vm.hideError();
    }else {
      if (vm.validarCampo(vm.cpf)){
        vm.error="Preencha o campo CPF para continuar.";
        vm.hideError();
      }else if (vm.validarNumeros(vm.cpf)) {
        vm.error="O Campo CPF deve conter somente Numeros.";
        vm.hideError();
      }else {
        if (vm.validarCampo(vm.telefone)){
          vm.error="Preencha o campo Telefone para continuar.";
          vm.hideError();
        }else if (vm.validarNumeros(vm.telefone)) {
          vm.error="O Campo Telefone deve conter somente Numeros.";
          vm.hideError();
        }else {
          if (vm.validarCampo(vm.usuario)){
            vm.error="Preencha o campo usuario para continuar.";
            vm.hideError();
          }else {
            if (vm.validarCampo(vm.senha)){
              vm.error="Preencha o campo Senha para continuar.";
              vm.hideError();
            }else {
              if (vm.senha != vm.cSenha){
                vm.error="Os Campos senhas nao estao iguais.";
                vm.hideError();
              }else {
                var candidato = {
                   nome                   : vm.nome,
                   cpf                    : vm.cpf,
                   telefone               : vm.telefone,
                   endereco               : vm.endereco,
                   sexo                   : vm.sexo,
                   idade                  : vm.idade,
                   termoResponsabilidade  : vm.termo,
                   usuario                : vm.usuario,
                   senha                  : vm.senha
                };

                debateFactory.getCPF(candidato.cpf).then(function(response){
                  if (response.data == undefined || response.data == null){
                    debateFactory.addCandidato(candidato).then(function(response){
                    });
                    vm.message = "Cadastro Realizado com Sucesso.";
                    vm.error = "";
                    vm.hideOk();

                    document.getElementById("nome").value     = "";
                    document.getElementById("cpf").value      = "";
                    document.getElementById("telefone").value = "";
                    document.getElementById("endereco").value = "";
                    document.getElementById("idade").value    = "";
                    document.getElementById("usuario").value  = "";
                    document.getElementById("senha").value    = "";
                    document.getElementById("cSenha").value   = "";

                  }else {
                    vm.error="CPF ja cadastrado.";
                    vm.hideError();
                  }
                });
              }
            }
          }
        }
      }
    }
  };
};
