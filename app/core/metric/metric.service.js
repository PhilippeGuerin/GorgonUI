'use strict';

angular.
  module('core.metric').
  factory('Metric', ['$resource', 
    function($resource) {
      return $resource('rest/gorgons/:gorgonId/metrics', {}, {
        query: {
          method: 'GET',
          isArray: true,
		  params: {gorgonId: 'gorgons'}
        },
		get: {
		  url: 'rest/gorgons/:gorgonId/metrics/:metricId',
		  method: 'GET',
          params: {gorgonId: 'gorgons', metricId: 'metrics'}
		},
		save: {
		  url: 'rest/gorgons/:gorgonId/metrics',
		  method: 'POST',
		  params: {gorgonId: 'gorgons', metricId: 'metrics'}
		},
		delete: {
		  url: 'rest/gorgons/:gorgonId/metrics/:metricId',
		  method: 'DELETE',
          params: {gorgonId: 'gorgons', metricId: 'metrics'}
		},
		add: {
		  url: 'rest/gorgons/:gorgonId/metrics/add',
		  method: 'PUT',
		  params: {gorgonId: 'gorgons'}
		}
      });
    }
  ]);