'use strict';

angular.
  module('core.schema').
  factory('Schema', ['$resource', 
    function($resource) {
      return $resource('rest/gorgons/:gorgonId/servers/:serverId/schemas', {}, {
        query: {
          method: 'GET',
          isArray: true,
		  params: {gorgonId: 'gorgons', serverId: 'servers'}
        },
		get: {
		  url: 'rest/gorgons/:gorgonId/servers/:serverId/schemas/:schemaId',
		  method: 'GET',
          params: {gorgonId: 'gorgons', serverId: 'servers', schemaId: 'schemas'}
		}
      });
    }
  ]);

