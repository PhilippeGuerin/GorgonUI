'use strict';

// Register `gorgonList` component, along with its associated controller and template
angular.
  module('gorgonList').
  component('gorgonList', {
    templateUrl: 'gorgon-list/gorgon-list.template.html',
    controller: ['$log', '$window', 'Gorgon',
      function GorgonListController($log, $window, Gorgon) {
        this.gorgons = Gorgon.query();

		this.deleteGorgon = function(id){
			var deleteUser = $window.confirm('Are you sure you want to delete this gorgon?');
			if (deleteUser) 
			{
				$log.log('Deleting gorgon with id ' + id + '...');
				Gorgon.delete({gorgonId: id});
				$window.location.reload();
			}
		}
      }
    ]
  });
