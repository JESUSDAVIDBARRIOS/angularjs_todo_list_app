'use strict';

angular.module('myApp.calendario', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/calendario', {
    templateUrl: 'calendario/calendario.html',
    controller: 'calendarController'
  });
}])

.controller('calendarController', [function() {
  $(document).ready(function() {
    $('#calendar').evoCalendar({
      
    })
  })
}]);