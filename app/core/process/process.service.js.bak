'use strict';

angular.
  module('core.process').
  factory('Process', ['$resource', 
    function($resource) {
      return $resource('rest/gorgons/:gorgonId/processes', {}, {
        query: {
          method: 'GET',
          isArray: true,
		  params: {gorgonId: 'gorgons'}
        },
		get: {
		  url: 'rest/gorgons/:gorgonId/processes/:processId',
		  method: 'GET',
          params: {gorgonId: 'gorgons', processId: 'processes'}
		},
		delete: {
		  url: 'rest/gorgons/:gorgonId/processes/:processId',
		  method: 'DELETE',
          params: {gorgonId: 'gorgons', processId: 'processes'}
		},
		add: {
		  url: 'rest/gorgons/:gorgonId/processes/add',
		  method: 'PUT',
		  params: {gorgonId: 'gorgons'}
		}
      });
    }
  ]);

