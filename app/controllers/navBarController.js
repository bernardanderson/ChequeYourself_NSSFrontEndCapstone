// This simply assigns a navbar heading to a angular url

app.controller("navBarController", function($scope, navBarFactory, localDataStorageFactory){

  $scope.navTitle = "Basic Navbar";

  // Var which holds the current view's nav buttons
  $scope.navButtons = navBarFactory.navButtons;

  // Local holder for the users accounts
  $scope.accountsArray = [];

  // Var for if the speedDial is open by default
  $scope.speedDial = {
    isOpen: false,
  }

  // Var for whether the user has at least one account on file
  $scope.atLeastOneAccount = false;

  // This is exclusively for the initial appChoice view page
  $scope.clickedChoice = function(sentNewView) {
    navBarFactory.setCurrentView(sentNewView);
  }

  // When an account is selected in the navBar on the displayLedger Page, this executes
  //  Updates the localDataStorageFactory variable selectedAccount
  $scope.sendAccount = function(sentSelectedAccount) {
    console.log(sentSelectedAccount);
    localDataStorageFactory.addSelectedAccount(sentSelectedAccount);
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
