// This simply assigns a navbar heading to a angular url

app.controller("navBarController", function($scope, navBarFactory, localDataStorageFactory){

  $scope.navItems = "Basic Navbar";

  $scope.navButtons = navBarFactory.navButtons;

  $scope.accountsArray = [];

  $scope.speedDial = {
    isOpen: false,
  }

  $scope.atLeastOneAccount = false;

  $scope.clickedChoice = function(sentNewView) {
    navBarFactory.setCurrentView(sentNewView);
  }

  //Watches for any click changes in the current "Main Page" view
  $scope.$watch(function() {return navBarFactory.currentView}, function(newVal, oldVal) {
    console.log(oldVal, newVal);
    if (newVal !== undefined){
      $scope.currentView = newVal;
      console.log("The current view in navBarController: ", $scope.currentView)
    }
  });

  //Watches for changes in the current accounts list
  $scope.$watchCollection(function() {return localDataStorageFactory.currentAccounts}, function(newVal, oldVal) {
    console.log("newVal.length: ", newVal.length);
    if (newVal.length === 0){
      $scope.atLeastOneAccount = false;
      $scope.accountsArray.splice(0);
    } else {
      $scope.atLeastOneAccount = true;
      $scope.accountsArray = localDataStorageFactory.currentAccounts;
      console.log("The current status of atLeastOneAccount: ", $scope.atLeastOneAccount)
    }
  });

});
