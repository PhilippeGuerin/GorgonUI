'use strict';

// Register `servers` component, along with its associated controller and template
angular.
  module('servers').
  component('servers', {
    templateUrl: 'servers/servers.template.html',
    controller: ['$routeParams', '$log', 'Server',
      function ProcessController($routeParams, $log, Server) {
		  var self = this;
		  self.gorgonId = $routeParams.gorgonId;
      }
    ]
  });
