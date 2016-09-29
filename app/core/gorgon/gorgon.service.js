'use strict';

angular.
  module('core.gorgon').
  factory('Gorgon', ['$resource', 
    function($resource) {
      return $resource('rest/gorgons', {}, {
        query: {
          method: 'GET',
          isArray: true
        },
		get: {
		  url: 'rest/gorgons/:gorgonId',
		  method: 'GET',
          params: {gorgonId: 'gorgons'}
		},
		save: {
		  url: 'rest/gorgons',
		  method: 'POST'
		},
		delete: {
		  url: 'rest/gorgons/:gorgonId',
		  method: 'DELETE',
          params: {gorgonId: 'gorgons'}
		},
		add: {
		  url: 'rest/gorgons/add',
		  method: 'PUT'
		}
      });
    }
  ]);

