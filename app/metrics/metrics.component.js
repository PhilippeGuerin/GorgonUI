'use strict';

// Register `metrics` component, along with its associated controller and template
angular.
  module('metrics').
  component('metrics', {
    templateUrl: 'metrics/metrics.template.html',
    controller: ['$routeParams', '$log', 'Metric',
      function ProcessController($routeParams, $log, Metric) {
		  var self = this;
		  self.gorgonId = $routeParams.gorgonId;
      }
    ]
  });
