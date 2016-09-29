'use strict';

// Register `manager` component, along with its associated controller and template
angular.
  module('manager').
  component('manager', {
    templateUrl: 'manager/manager.template.html',
    controller: ['$routeParams', '$log', '$window',
      function ManagerController($routeParams, $log, $window) {
		  var self = this;
		  self.gorgonId = $routeParams.gorgonId;
		  
		  self.gotoReports = function () {
			  $window.location.href = "#!/gorgons/"+self.gorgonId+"/reports";
		  }
		  self.gotoProcess = function () {
			  $window.location.href = "#!/gorgons/"+self.gorgonId+"/process";
		  }
		  self.gotoServers = function () {
			  $window.location.href = "#!/gorgons/"+self.gorgonId+"/servers";
		  }
		  self.gotoMetrics = function () {
			  $window.location.href = "#!/gorgons/"+self.gorgonId+"/metrics";
		  }
      }
    ]
  });
