// This simply assigns a navbar heading to a angular url

app.controller("navBarController", function($scope, navBarFactory){

  $scope.navItems = "Basic Navbar";

  $scope.navButtons = navBarFactory.navButtons;

  $scope.speedDial = {
    isOpen: false,
  }

  $scope.clickedChoice = function(sentNewView) {
    navBarFactory.setCurrentView(sentNewView);
  }

  //Watches for any click changes in the current "Main Page" view
  $scope.$watch(function() {return navBarFactory.currentView}, function(newVal, oldVal) {
    if (newVal !== undefined){
      $scope.currentView = newVal;
      console.log($scope.currentView)
      
    }
  }) ;

});
