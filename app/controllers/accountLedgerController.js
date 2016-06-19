app.controller("accountLedgerController", function($scope, navBarFactory, localDataStorageFactory){

  $scope.pageTitle = "Account Ledger";

  if (localDataStorageFactory.currentAccounts.length === 0) {
    navBarFactory.setNavButtons(
      [{
        buttonLabel: "Add New Account",
        viewChange: "addNewAccount"
      }]
    );
  } else {
    navBarFactory.setNavButtons(
      [{
        buttonLabel: "Edit Account",
        viewChange: "addNewAccount"
      },
      {
        buttonLabel: "Add New Account",
        viewChange: "addNewAccount"
      }]
    );
  }





});