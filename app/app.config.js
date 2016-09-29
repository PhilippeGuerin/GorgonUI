'use strict';

angular.
  module('phonecatApp').
	run(function(editableOptions) {
		editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});

angular.
  module('phonecatApp').
  config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/phones', {
          template: '<phone-list></phone-list>'
        }).
        when('/phones/:phoneId', {
          template: '<phone-detail></phone-detail>'
        }).
		when('/gorgons', {
          template: '<gorgon-list></gorgon-list>'
        }).
        when('/gorgons/:gorgonId', {
          template: '<gorgon-detail></gorgon-detail>'
        }).
        when('/gorgons/:gorgonId/manager', {
          template: '<manager></manager>'
        }).
        when('/gorgons/:gorgonId/process', {
          template: '<process></process>'
        }).
        when('/gorgons/:gorgonId/reports', {
          template: '<reports></reports>'
        }).
        when('/gorgons/:gorgonId/servers', {
          template: '<servers></servers>'
        }).
        when('/gorgons/:gorgonId/metrics', {
          template: '<metrics></metrics>'
        }).
        otherwise('/gorgons');
    }
  ]);
