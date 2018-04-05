angular.module('fullstack', ['ngRoute', 'angular-jwt']).config(config).run(run);

function config($httpProvider, $routeProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');

  $routeProvider
    .when('/', {
      templateUrl : 'angular-app/Views/main/main.html',
      controller    : MainController,
      controllerAs  : 'vm',
      access      : {
        restricted: false
      }
    })
    .when('/editarCandidato/:id', {
      templateUrl   : 'angular-app/Views/editarCandidato/editarCandidato.html',
      controller    : editarCandidatocontroller,
      controllerAs  : 'vm',
      access        : {
        restricted  : false
      }
    })
    .when('/cadastroCandidato', {
      templateUrl   : 'angular-app/Views/cadastroCandidato/cadastroCandidato.html',
      controller    : cadastroCandidatocontroller,
      controllerAs  : 'vm',
      access        : {
        restricted  : false
      }
    })
    .when('/listaCandidatos', {
      templateUrl   : 'angular-app/Views/candidatosLista/candidatosLista.html',
      controller    : candidatosListacontroller,
      controllerAs  : 'vm',
      access        : {
        restricted  : false
      }
    })
    .otherwise({
      redirectTo: '/'
    });
}

function run($rootScope, $location, $window, AuthFactory) {
  $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
    if (nextRoute.access !== undefined && nextRoute.access.restricted && !$window.sessionStorage.token && !AuthFactory.isLoggedIn) {
      event.preventDefault();
      $location.path('/');
    }
  });
}
