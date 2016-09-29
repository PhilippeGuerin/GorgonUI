'use strict';

// Register `gorgonDetail` component, along with its associated controller and template
angular.
  module('gorgonDetail').
  component('gorgonDetail', {
    templateUrl: 'gorgon-detail/gorgon-detail.template.html',
    controller: ['$routeParams', '$window', '$log', 'Gorgon',
      function GorgonDetailController($routeParams, $window, $log, Gorgon) {
        var self = this;
        self.gorgon = Gorgon.get({gorgonId: $routeParams.gorgonId});

		self.saveGorgon = function (){
			if (angular.isUndefined(self.gorgon.id))
			{
				$log.log('Adding new gorgon...');
				self.gorgon.$add()
			}
			else
			{
				$log.log('Saving gorgon with id ' + self.gorgon.id + '...');
				self.gorgon.$save();
			}
			$window.location.href = "";
		}
      }
    ]
  });
