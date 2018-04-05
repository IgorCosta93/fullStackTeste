angular.module('fullstack').controller('LoginController', LoginController);

function LoginController($http, $location, $window, AuthFactory,debateFactory, jwtHelper,$timeout) {
  var vm = this;
  vm.adm = "NAO";

  vm.isLoggedIn = function() {
    if (AuthFactory.isLoggedIn) {
      return true;
    } else {
      return false;
    }
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
        vm.hideLoader = true;
        vm.erro="";
        vm.message="Bem vindo";
    }, 2500);
  };

  vm.login = function() {
    console.log(vm.usuario+""+vm.senha);
    if ((vm.usuario != "") && (vm.senha != "")) {
      var user = {
        usuario : vm.usuario,
        senha   : vm.senha
      };

      $http.post('/api/login', user).then(function(response) {
        if (response.data.success) {
          $window.sessionStorage.token = response.data.token;
          AuthFactory.isLoggedIn = true;
          var token = $window.sessionStorage.token;
          var decodedToken = jwtHelper.decodeToken(token);
          vm.loggedInUser = decodedToken.usuario;
          vm.erro = '';

          vm.hideOk();

        }
      }).catch(function(error) {
        //console.log("TESTE Error");
        console.log(error.status);
        if (error.status == 404){
          vm.erro = "Usuario não encontrado.";
        }else if (error.status == 401) {
          vm.erro = "Senha incorreta.";
        }
        vm.hideError();
      });
    }else {
      vm.erro = "Preencha os campos Usuario e senha para continuar.";
      vm.hideError();
    }
    vm.usuario  = "";
    vm.senha    = "";
  };

  vm.logout = function() {
    AuthFactory.isLoggedIn = false;
    delete $window.sessionStorage.token;
    $location.path('/');
    vm.adm = "NAO";
  }

  vm.isActiveTab = function(url) {
    var currentPath = $location.path().split('/')[1];
    return (url === currentPath ? 'active' : '');
  }
}
