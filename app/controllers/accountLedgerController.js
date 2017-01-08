"use strict";

app.controller("accountLedgerController", function($scope, navBarFactory, localDataStorageFactory){

  $scope.newSingleLineItem = {};

  $scope.ledgerItems = [];

  $scope.categories = ["Home", "Utilities", "Entertainment", "Misc"];


  // Variable for Deposit versus Withdrawl Pie Chart
  $scope.depositsWithdrawls = {
    labels: ["Deposits", "Withdrawls"],
    data: [0, 0],
    colors: ['#487257','#F26979']
  };

  // Variable for Category Pie Chart
  $scope.categoryPie = {
    labels: $scope.categories,
    data: [0, 0, 0, 0]
  };

  // Variable for Single Item Expenditure Bar Chart
  $scope.singleExpenditure = {
    arrayListNoRepeats: [],
    labels: ["Nothing Selected"],
    data: [0],
    options:  {
      scales: {
        yAxes: [{
          display: true,
          ticks: {
            beginAtZero: true   // minimum value will be 0.
          }
        }]
      }
    }
  };

  navBarFactory.changeNavBarTitle("Account Ledger");

  localDataStorageFactory.selectedAccount.splice(0);

  // Resets the editting mode to false when returning to the Account Ledger
  localDataStorageFactory.isEditClick = false;

  //Clears the selected line items from the print queue
  localDataStorageFactory.selectedLineItemsForPrint.splice(0);

  // Checks to see if the user has created at least one account, if not, they can only add an account instead of adding/editing.
  if (localDataStorageFactory.currentAccounts.length === 0 ) {
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

  // On account change this gets run and clears the $scope.ledgerItems array for 
  //  the singally selected Account and repopulates it with ledger items for that 
  //  new account
  $scope.accountItems = function() {

    let completeLedgerList = localDataStorageFactory.currentLedgerItems;
    $scope.ledgerItems.splice(0);

    if (localDataStorageFactory.selectedAccount.length > 0) {
      for (var singleItem in completeLedgerList) {
        if (completeLedgerList[singleItem].accountID === localDataStorageFactory.selectedAccount[0].accountID) {

          // Sorts the ledger items for graphical viewing
          $scope.sortDepositsWithdrawlPie(completeLedgerList[singleItem]);
          $scope.sortCategoryPie(completeLedgerList[singleItem]);
          $scope.sortSingleItem(completeLedgerList[singleItem]);

          $scope.ledgerItems.push(completeLedgerList[singleItem]);

        }
      }
    }
  };

  // This sorts and stores the deposit and withdrawl money values for displaying in the
  //  Deposit versus Withdrawl Pie Chart
  $scope.sortDepositsWithdrawlPie = function(sentSingleItem) {
    if (sentSingleItem.type === "Withdrawl") {
      $scope.depositsWithdrawls.data[1] = $scope.depositsWithdrawls.data[1] + Number((sentSingleItem.checkAmount).slice(1));
    } else {
      $scope.depositsWithdrawls.data[0] = $scope.depositsWithdrawls.data[0] + Number((sentSingleItem.checkAmount).slice(1));
    }
  };

  // This sorts and stores the category money values for display on the Category Pie Chart
  $scope.sortCategoryPie = function(sentSingleItem) {
    if (sentSingleItem.type === "Withdrawl") {
      for (var i = 0 ; i < $scope.categories.length; i++) {
        if (sentSingleItem.category === $scope.categories[i]) {
          $scope.categoryPie.data[i] = $scope.categoryPie.data[i] + Number((sentSingleItem.checkAmount).slice(1));
          break;
        }
      }
    }
  };

  // This takes the current ledger list and gets the names of items but doesn't allow
  //  any repeats
  $scope.sortSingleItem = function(sentSingleLedgerItem) {
    if ($scope.singleExpenditure.arrayListNoRepeats.indexOf(sentSingleLedgerItem.transaction) === -1) {
      $scope.singleExpenditure.arrayListNoRepeats.push(sentSingleLedgerItem.transaction);
    }
  };

  // Once a single Ledger Item is select for graphing, this picks the date and expenditure
  //  info and puts it in the appropriate variables
  $scope.updateBarGraph = function(sentSingleLedgerItemName){

    let tempItemArray = 
      {
        labels: [],
        data: []
      };

    for (var i = 0; i < $scope.ledgerItems.length; i++) {
      if ($scope.ledgerItems[i].transaction === sentSingleLedgerItemName) {
        tempItemArray.labels.push($scope.ledgerItems[i].checkDate);
        tempItemArray.data.push(Number(($scope.ledgerItems[i].checkAmount).slice(1)));
      }
    }

    $scope.singleExpenditure.labels = tempItemArray.labels;
    $scope.singleExpenditure.data = tempItemArray.data;

  };

  // Deletes a single ledger item from the currentLedgerItems array
  $scope.deleteLineItem = function(sentCurrentLineItem) {

    let completeLedgerList = localDataStorageFactory.currentLedgerItems;
    for (var singleItem in completeLedgerList) {
      if (completeLedgerList[singleItem].lineItemID === sentCurrentLineItem.lineItemID) {
        completeLedgerList.splice(singleItem, 1);
        break;
      }
    }
  };

  // Gets the starting account amount for displaying on the Account Ledger Page
  $scope.currentlySelectedAccount = function() {
    let selectedAccountData = localDataStorageFactory.selectedAccount;
    if (selectedAccountData.length > 0) {
      $scope.selectedAccountStartingAmount = selectedAccountData[0].startingAmount;
      return `Starting $${selectedAccountData[0].startingAmount}`;
    } else {
      return "(No Account Selected)";
    }
  };

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
  };

  // When the "Add to Ledger" button is clicked to add a new line item to the ledger, this is used to add a 
  //  single item to the localDataStorageFactory selectedAccountLedgerItems array.
  //  This also handles the updating of the line items by checking to see if the "newSingleLineItem" already has a
  //  lineItemID (which means the item already exists and is being edited)
  $scope.addNewLineItem = function() {

    let sentLineItem = $scope.newSingleLineItem;
    
    if (sentLineItem.lineItemID) {
      
      let lineItemID = sentLineItem.lineItemID;
      for (var element in localDataStorageFactory.currentLedgerItems) {
        if (localDataStorageFactory.currentLedgerItems[element].lineItemID === lineItemID) {
          sentLineItem.checkAmount = localDataStorageFactory.formatNumbersToCurrencyString(sentLineItem.checkAmount);
          localDataStorageFactory.currentLedgerItems[element] = sentLineItem;
          $scope.accountItems();
          break;
        }
      }
    } else {
      
    let tempLineItemID = localDataStorageFactory.generateUniqueId();
    sentLineItem.lineItemID = tempLineItemID;
    
    sentLineItem.accountID = localDataStorageFactory.selectedAccount[0].accountID;
    sentLineItem.checkAmount = localDataStorageFactory.formatNumbersToCurrencyString(sentLineItem.checkAmount);
    localDataStorageFactory.addNewAccountLedgerItem(sentLineItem);
    }

    $scope.newSingleLineItem = {}; // Clears the newSingleLineItem inputs on the DOM
  };

  $scope.editLineItem = function(sentLineItem) {
    $scope.newSingleLineItem = sentLineItem;
  };

  // When an ledger item is checked this either adds it to the array of things to print a check of or removes it from the
  //  the array.
  $scope.onLedgerChecked = function(sentLedgerItem) {

    let indexOfSentLedgerItem = localDataStorageFactory.selectedLineItemsForPrint.indexOf(sentLedgerItem);

    if (indexOfSentLedgerItem === -1) {
      localDataStorageFactory.selectedLineItemsForPrint.push(sentLedgerItem);
    } else {
      localDataStorageFactory.selectedLineItemsForPrint.splice(indexOfSentLedgerItem, 1);
    }
  };


  //Watches for selection in the navBar selected account list
  $scope.$watchCollection(function() {return localDataStorageFactory.selectedAccount;}, function(newVal, oldVal) {
    if (newVal.length > 0){

      $scope.depositsWithdrawls.data = [0,0];
      $scope.categoryPie.data = [0, 0, 0, 0];

      $scope.disableNewLedgerAddition = false;
      $scope.accountItems();

    } else {
      $scope.disableNewLedgerAddition = true;
    }
  });

  // This watches for a change in the currentLedger items and updates the ledger list
  $scope.$watchCollection(function() {return localDataStorageFactory.currentLedgerItems;}, function(newVal, oldVal) {

    $scope.depositsWithdrawls.data = [0,0];
    $scope.categoryPie.data = [0, 0, 0, 0];

    $scope.accountItems();
  });

});