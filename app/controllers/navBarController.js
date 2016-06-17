// This simply assigns a navbar heading to a angular url

app.controller("navBarController", function($scope, navBarFactory){

  $scope.navItems = "Basic Navbar";

  //Watches for any click changes in the current "Main Page" view
  $scope.$watch(function() {return navBarFactory.currentView}, function(newVal, oldVal) {
    if (newVal !== undefined){
      $scope.currentView = newVal;
    }
  }) ;

});
