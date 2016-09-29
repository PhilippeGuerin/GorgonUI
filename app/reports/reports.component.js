'use strict';

// Register `reports` component, along with its associated controller and template
angular.
  module('reports')
  .component('reports', {
    templateUrl: 'reports/reports.template.html',
    controller: ['$routeParams', '$log', '$timeout', '$mdSidenav', '$mdDialog', 'Server', 'Schema', 'Metric', 'SchemaMetric',
      function ProcessController($routeParams, $log, $timeout, $mdSidenav, $mdDialog, Server, Schema, Metric, SchemaMetric) {
		  var self = this;
		  self.gorgonId = $routeParams.gorgonId;
		  self.showSchemas = false;
		  self.schemas;
		  self.metricsData;

		  self.openServers = buildDelayedToggler('serversNav');
		  self.openSchemas = buildDelayedToggler('schemasNav');
		  /**
		   * Supplies a function that will continue to operate until the
		   * time is up.
		   */
		  function debounce(func, wait, context) {
		    var timer;
		    return function debounced() {
			  var context = self,
				args = Array.prototype.slice.call(arguments);
			  $timeout.cancel(timer);
			  timer = $timeout(function() {
			    timer = undefined;
			    func.apply(context, args);
			  }, wait || 10);
		    };
		  }

		  /**
		  * Build handler to open/close a SideNav; when animation finishes
		  * report completion in console
		  */
		  function buildDelayedToggler(navID) {
			return debounce(function() {
			// Component lookup should always be available since we are not using `ng-if`
			  $mdSidenav(navID)
			    .toggle()
				.then(function () {$log.log("toggle " + navID + " is done");});
			  }, 200);
			}

			function loadData(){
				self.metricsData = SchemaMetric.query(
				  {gorgonId: self.gorgonId, schemaId: self.selectedSchemaId}, 
				  function()
				  {
					$log.log("metrics data loaded: " + self.metricsData.length);
				  });
			}
			
		  self.showList = function(metricData) {
			$mdDialog.show({
			  templateUrl: 'reports/report.list.template.html',
			  clickOutsideToClose:true,
			  fullscreen:true, // Only for -xs, -sm breakpoints.
			  locals: {metricName: metricData.metric.metricName, listData: metricData.data},
			  controller: listController,
			  controllerAs: 'ctrl', 
			});
		  };

		  function listController($mdDialog, metricName, listData) {
			this.metricName = metricName;
			this.listData = listData;

			this.closeDialog = function() {
				$mdDialog.hide();
				}
		  }

		  self.openSchemaChooser = function(serverId){
			  self.selectedServerId = serverId;
			  $log.log("New Selected Server: " + serverId);
			  self.showSchemas = true;
			  self.schemas = Schema.query(
				  {gorgonId: self.gorgonId, serverId: self.selectedServerId}, 
				  function()
				  {
					$log.log("Schemas loaded: " + self.schemas.length);
				  });
		  }

		  self.setServerId = function(serverId){
			  self.selectedServerId = serverId;
			  self.selectedSchemaId = -1;
			  $log.log("New Selected Server: " + serverId);
			  
			  self.showSchemas = false;
			  $mdSidenav('serversNav').close()
				.then(function () {$log.log("close serversNav is done");});			  
		  }

		  self.setSchemaId = function(schemaId){
			  self.selectedSchemaId = schemaId;
			  $log.log("New Selected Schema: " + schemaId);
			  
			  $mdSidenav('serversNav').close()
				.then(function () {$log.log("close serversNav is done");});
			  self.showSchemas = false;

			  loadData();
		  }

		  self.formatConnectionString = function (s){
			//"hostaddr=1.1.1.1 port=2280 dbname=postgres user=login password=password"
			var ip = s.match("hostaddr=([0-9\.]+) ");
			var port = s.match("port=([0-9]+) ");
			var dbname = s.match("dbname=([A-Za-z]+) ");
			if ((ip == null) || (port == null) || (dbname == null))
			  return "Unable to extract connection information!";
			else
			  return ip[1] + ": " + port[1] + "/" + dbname[1];
		  }

		  self.servers = Server.query({gorgonId: self.gorgonId}, function(){
			  $log.log("Servers loaded!");
			  self.openServers();});
		  self.selectedServerId = -1;
		  self.selectedSchemaId = -1;
      }
    ]
  });
