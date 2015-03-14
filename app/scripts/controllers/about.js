'use strict';

/**
 * @ngdoc function
 * @name socialApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the socialApp
 */
angular.module('socialApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
