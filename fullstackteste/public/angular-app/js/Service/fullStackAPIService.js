angular.module("fullstack").service("db8APIService", function(debateFactory){

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

  vm.verificarInfo = function(){
    var status = {
      ok        : Boolean,
      error     : String
    };
    if (vm.validarCampo(candidato.nome)){
      status.error="Preencha o campo Nome para continuar.";
      return status.ok = false;
    }else if (vm.validarLetras(candidato.nome)) {
      status.error="O Campo nome deve conter somente Letras.";
      return status.ok = false;
    }else {
      if (vm.validarCampo(candidato.cpf)){
        status.error="Preencha o campo CPF para continuar.";
        return status.ok = false;
      }else if (vm.validarNumeros(candidato.cpf)) {
        status.error="O Campo CPF deve conter somente Numeros.";
        return status.ok = false;
      }else {
        if (vm.validarCampo(candidato.telefone)){
          status.error="Preencha o campo Telefone para continuar.";
          return status.ok = false;
        }else if (vm.validarNumeros(candidato.telefone)) {
          status.error="O Campo Telefone deve conter somente Numeros.";
          return status.ok = false;
        }else {
          return status.ok = true;
        }
      }
    }
  };

});
