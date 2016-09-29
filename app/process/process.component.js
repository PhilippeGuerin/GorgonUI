'use strict';

// Register `process` component, along with its associated controller and template
angular.
  module('process').
  component('process', {
    templateUrl: 'process/process.template.html',
    controller: ['$routeParams', '$log', '$interval', '$filter', 'Server', 'Process',
      function ProcessController($routeParams, $log, $interval, $filter, Server, Process) {
		  var self = this;
		  self.gorgonId = $routeParams.gorgonId;
		  self.showServers = false;
		  self.showProcesses = false;
		  self.kickedOffAnalysis = false;
		  self.selectedServers = 0;
		  self.runningProcesses = 0;
		  self.pendingProcesses = 0;
		  self.serverTime = Server.serverTime({gorgonId: self.gorgonId});

		  self.formatLastComputed = function(lastComputed){
			  if (lastComputed == null)
				  return "Never Computed!";
			  else
			  {
				//difference in milliseconds
				var diff = new Date(self.serverTime.value).getTime() - new Date(lastComputed).getTime();

				var seconds = Math.floor(diff / 1000);

				var minutes = Math.floor(seconds / 60);
				seconds = seconds  - (minutes * 60);
				
				var hours = Math.floor(minutes / 60);
				minutes = minutes - (hours * 60);

				var days = Math.floor(hours / 24);
				hours  = hours - (days * 24);

				var s = "";
				if (days > 0)
					s = s + days + " day";
				if (days > 1)
					s = s + "s";
				s = s + " ";

				if (hours > 0)
					s = s + hours + " hour";
				if (hours > 1)
					s = s + "s";
				s = s + " ";

				if (minutes > 0)
					s = s + minutes + " minute";
				if (minutes > 1)
					s = s + "s";
				s = s + " ";

				return "Last computed " + s + " ago";
			  }
		  }

		  self.countSelectedServers = function(){
			var i;
			self.selectedServers = 0;
			for (i = 0; i < self.servers.length; i++) 
				if (self.servers[i].active)
					self.selectedServers++;
		  }

		  self.countRunningProcesses = function(){
			var i;
			self.runningProcesses = 0;
			self.pendingProcesses = 0;
			for (i = 0; i < self.processes.length; i++)
			{
				if (self.processes[i].state == 1)
					self.runningProcesses++;
				if (self.processes[i].state == 0)
					self.pendingProcesses++;
			}
		  }

		  self.formatDuration = function(duration){
			var h = Math.floor(duration / 3600);
			var m = Math.floor(duration % 3600 / 60);
			var s = Math.floor(duration % 3600 % 60);
			return ((h > 0 ? h + "h" + (m < 10 ? "0" : "") : "") + m + "m" + (s < 10 ? "0" : "") + s + "s");
		  }

		  self.formatConnectionString = function(s){
			//"hostaddr=1.1.1.1 port=2280 dbname=postgres user=login password=password"
			var ip = s.match("hostaddr=([0-9\.]+) ");
			var port = s.match("port=([0-9]+) ");
			var dbname = s.match("dbname=([A-Za-z]+) ");
			if ((ip == null) || (port == null) || (dbname == null))
			  return "Unable to extract connection information!";
			else
			  return "IP: " + ip[1] + "\nPort: " + port[1] + "\nDB Name: " + dbname[1];
		  }

		  self.getServerById = function (serverId){
			var i;
			for (i = 0; i < self.servers.length; i++) 
				if (self.servers[i].serverId == serverId)
					return self.servers[i];
			return null;
		  }

		  self.showHideServers = function() {
			  self.showServers = !self.showServers;
		  }

		  self.showHideProcesses = function() {
			  self.showProcesses = !self.showProcesses;
			  if (self.showProcesses)
				  self.reloadProcesses();
		  }

		  self.changeActiveStatus = function (server){
			server.active = !server.active;
		    $log.log(server.serverName + " is now " + (server.active ? "active" : "inactive"));
			server.$save({gorgonId: self.gorgonId});
			self.countSelectedServers();
		  }

		  self.cancelProcess = function(id){
		    $log.log("Cancel Process " + id);
			$interval.cancel(self.autoReload);
			Process.delete({gorgonId: self.gorgonId, processId: id}, 
				function success(){self.reloadProcesses();},
				function failure(){self.reloadProcesses();});
		  }

		  self.analyze = function(){
			//reset interval
			$interval.cancel(self.autoReload);
			self.kickedOffAnalysis = true;

			var i;
			var newProcessesSent = 0;
			for (i = 0; i < self.servers.length; i++) 
				if (self.servers[i].active)
			    {
				  $log.log("Analyzing server " + self.servers[i].serverId);
				  newProcessesSent++;
				  var process = new Process();
				  process.name = "Analyzing server '" + self.servers[i].serverName + "'";
				  process.serverId = self.servers[i].serverId;
				  if (self.selectedServers == newProcessesSent)
					process.$add({gorgonId: self.gorgonId}, function success(){self.reloadProcesses();});
				  else
					process.$add({gorgonId: self.gorgonId});
			    }			
		  }

		  self.reloadProcesses = function () {			
			$log.log("Reloading Processes...");
			$interval.cancel(self.autoReload);
			//turn it synchronous for UI's sake
			self.processes = Process.query({gorgonId: self.gorgonId}, 
			  function success(){
				if (self.processes.lenght == 0)
					self.showProcesses = false;
			    self.countRunningProcesses();
			    if (self.kickedOffAnalysis)
				{
					self.kickedOffAnalysis = false;
					self.showServers = false;
					self.showProcesses = true;
				}
				if (self.showProcesses)
					self.autoReload = $interval(self.reloadProcesses, 10000);
			  }, 
			  function error(){
				$interval.cancel(self.autoReload);
			  });			
		  }

		  self.servers = Server.query({gorgonId: self.gorgonId}, function success() {self.countSelectedServers();});
		  self.reloadProcesses();
		  
		  self.$onDestroy = function() {
			$log.log("onDestroy, Stop auto refresh");
            $interval.cancel(self.autoReload);
          };
      }
    ]
  });
