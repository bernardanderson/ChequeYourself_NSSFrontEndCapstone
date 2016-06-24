app.controller("accountLedgerController", function($scope, navBarFactory, localDataStorageFactory){

  navBarFactory.changeNavBarTitle("Account Ledger");

  // Clears any LedgerItems on page load
  localDataStorageFactory.selectedAccountLedgerItems.splice(0);

  $scope.accountItems = localDataStorageFactory.selectedAccountLedgerItems;

  $scope.newSingleLineItem = {};

  // $scope.selectedAccountCurrentAmount = 0;

  // Resets the editting mode to false when returning to the Account Ledger
  localDataStorageFactory.isEditClick = false;

  //Clears the selected line items from the print queue
  localDataStorageFactory.selectedLineItemsForPrint.splice(0);

  // Checks to see if the user has created at least one account, if not, they can only add an account instead of adding/editing.
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
        viewChange: "addNewAccount",
        extraParameters: "Edit"
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
  //  This also handles the updating of the line items by checking to see if the "newSingleLineItem" already has a
  //  lineItemID (which means the item already exists and is being edited)
  $scope.addNewLineItem = function() {

    let sentLineItem = $scope.newSingleLineItem;
    
    if (sentLineItem.lineItemID) {
      
      let lineItemID = sentLineItem.lineItemID;
      
      for (var element in localDataStorageFactory.selectedAccountLedgerItems) {
        if (localDataStorageFactory.selectedAccountLedgerItems[element].lineItemID === lineItemID) {
          sentLineItem.checkAmount = localDataStorageFactory.formatNumbersToCurrencyString(sentLineItem.checkAmount);
          localDataStorageFactory.selectedAccountLedgerItems[element] = sentLineItem;
          break;
        }
      }
    } else {
      
    let tempLineItemID = localDataStorageFactory.generateUniqueId();
    sentLineItem.lineItemID = tempLineItemID;
    
    sentLineItem.accountID = localDataStorageFactory.selectedAccount[0].accountID
    sentLineItem.checkAmount = localDataStorageFactory.formatNumbersToCurrencyString(sentLineItem.checkAmount);
    localDataStorageFactory.addNewAccountLedgerItem(sentLineItem);
    }

    $scope.newSingleLineItem = {}; // Clears the newSingleLineItem inputs on the DOM
  }

  $scope.editLineItem = function(sentLineItem) {
    $scope.newSingleLineItem = sentLineItem;
  }

  // When an ledger item is checked this either adds it to the array of things to print a check of or removes it from the
  //  the array.
  $scope.onLedgerChecked = function(sentLedgerItem) {

    let indexOfSentLedgerItem = localDataStorageFactory.selectedLineItemsForPrint.indexOf(sentLedgerItem);

    if (indexOfSentLedgerItem === -1) {
      localDataStorageFactory.selectedLineItemsForPrint.push(sentLedgerItem);
    } else {
      localDataStorageFactory.selectedLineItemsForPrint.splice(indexOfSentLedgerItem, 1);
    }
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