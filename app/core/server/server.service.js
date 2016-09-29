'use strict';

angular.
  module('core.server').
  factory('Server', ['$resource', 
    function($resource) {
      return $resource('rest/gorgons/:gorgonId/servers', {}, {
        query: {
          method: 'GET',
          isArray: true,
		  params: {gorgonId: 'gorgons'}
        },
		get: {
		  url: 'rest/gorgons/:gorgonId/servers/:serverId',
		  method: 'GET',
          params: {gorgonId: 'gorgons', serverId: 'servers'}
		},
		save: {
		  url: 'rest/gorgons/:gorgonId/servers',
		  method: 'POST',
		  params: {gorgonId: 'gorgons', serverId: 'servers'}
		},
		delete: {
		  url: 'rest/gorgons/:gorgonId/servers/:serverId',
		  method: 'DELETE',
          params: {gorgonId: 'gorgons', serverId: 'servers'}
		},
		add: {
		  url: 'rest/gorgons/:gorgonId/servers/add',
		  method: 'PUT',
		  params: {gorgonId: 'gorgons'}
		},
		serverTime: {
		  url: 'rest/gorgons/:gorgonId/servers/serverTime',
		  method: 'GET',
		  params: {gorgonId: 'gorgons'}
	    }
      });
    }
  ]);

