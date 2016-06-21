app.controller("accountLedgerController", function($scope, navBarFactory, localDataStorageFactory){

  $scope.pageTitle = "Account Ledger";

  $scope.accountItems = localDataStorageFactory.selectedAccountLedgerItems;

  $scope.selectedAccountCurrentAmount = 0;

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

  // Gets the starting account amount for displaying on the Account Ledger Page
  $scope.currentlySelectedAccount = function() {

    let selectedAccountData = localDataStorageFactory.selectedAccount;
    if (selectedAccountData.length > 0) {
      $scope.selectedAccountStartingAmount = selectedAccountData[0].startingAmount;
      return `Starting $${selectedAccountData[0].startingAmount}`;
    } else {
      return "No Account Selected";
    }
  }

  $scope.calcLineItemTotal = function(sentCurrentLineItem) {

    let currentLineItemAmount = parseFloat(sentCurrentLineItem.checkAmount.replace(/[^\d.]/g, ''));

    if (sentCurrentLineItem.type === "Withdrawl") {
      $scope.selectedAccountStartingAmount = $scope.selectedAccountStartingAmount - currentLineItemAmount;
    } else {
      $scope.selectedAccountStartingAmount = $scope.selectedAccountStartingAmount + currentLineItemAmount;
    }
    return `$${$scope.selectedAccountStartingAmount.toFixed(2)}`;
  }

  $scope.addNewLineItem = function(sentLineItem) {
    let tempLineItemID = localDataStorageFactory.generateUniqueId()
    sentLineItem.lineItemID = tempLineItemID;
    console.log(sentLineItem);
  }

  //Watches for selection in the navBar selected account list
  $scope.$watchCollection(function() {return localDataStorageFactory.selectedAccount}, function(newVal, oldVal) {
    console.log("localDataStorageFactory.selectedAccount.length: ", newVal.length);
    if (newVal.length > 0){
      $scope.disableNewLedgerAddition = false;
    } else {
      $scope.disableNewLedgerAddition = true;
    }
  });

});