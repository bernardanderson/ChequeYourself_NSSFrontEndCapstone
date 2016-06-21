app.controller("accountLedgerController", function($scope, navBarFactory, localDataStorageFactory){

  $scope.pageTitle = "Account Ledger";

  $scope.accountItems = localDataStorageFactory.selectedAccountLedgerItems;

  $scope.newSingleLineItem = {};

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
      return "(No Account Selected)";
    }
  }

  // Calculates the current line item total as the ledger ng-repeat is displaying the line items
  //  It strips the "string" checkValue to numbers (keeping the decimal) and converts to string to a floating point
  //  value.  It does the math based on whether it's a Deposit or Withdrawl and then returns the value as a string
  //  to two decimal places. 
  $scope.calcLineItemTotal = function(sentCurrentLineItem) {

    let currentLineItemAmount = parseFloat(sentCurrentLineItem.checkAmount.replace(/[^\d.]/g, ''));

    if (sentCurrentLineItem.type === "Withdrawl") {
      $scope.selectedAccountStartingAmount = $scope.selectedAccountStartingAmount - currentLineItemAmount;
    } else {
      $scope.selectedAccountStartingAmount = $scope.selectedAccountStartingAmount + currentLineItemAmount;
    }
    return `$${$scope.selectedAccountStartingAmount.toFixed(2)}`;
  }

  // When the "Add to Ledger" button is clicked to add a new line item to the ledger, this is used to add a 
  //  single item to the localDataStorageFactory selectedAccountLedgerItems array.
  $scope.addNewLineItem = function() {
    
    let sentLineItem = $scope.newSingleLineItem;
    let tempLineItemID = localDataStorageFactory.generateUniqueId();
    sentLineItem.lineItemID = tempLineItemID;
    
    sentLineItem.accountID = localDataStorageFactory.selectedAccount[0].accountID
    sentLineItem.checkAmount = localDataStorageFactory.formatNumbersToCurrencyString(sentLineItem.checkAmount);
    localDataStorageFactory.addNewAccountLedgerItem(sentLineItem);

    $scope.newSingleLineItem = {}; // Clears the newSingleLineItem inputs on the DOM

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