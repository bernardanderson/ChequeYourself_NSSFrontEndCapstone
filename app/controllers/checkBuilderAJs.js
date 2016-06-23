app.controller("checkBuilderAJs", function($scope, XHRFactory, navBarFactory, localDataStorageFactory){

  navBarFactory.setNavButtons([
    {
      buttonLabel: "Print Checks",
      viewChange: ""
    },
    {
      buttonLabel: "Clear Checks",
      viewChange: "chequeWriter",
      extraParameters: "ClearChecks"
    }
  ]);

  // Localizes the account selected from the navBar 
  $scope.selectedAccount = localDataStorageFactory.selectedAccount;

  // Used in hiding the titles on the movable check elements
  $scope.hideElement = false;

  // Changes the status of the hidden/shown elements in the movable check elements
  $scope.changeHide = function(sentChange) {
    $scope.hideElement = !$scope.hideElement;
  }

  // The current number of checks to loop through
  $scope.numberOfChecks = [1, 2, 3];

  // Pulls the check elements from the local json and populates the check fields
  XHRFactory.pullXHRData("json/elements.json").then(function(response) {
    $scope.checkEntryElementData = response.data.domElements;
    console.log($scope.checkEntryElementData)
  });



/////////
  if (localDataStorageFactory.selectedAccount.length === 1 && localDataStorageFactory.selectedLineItemsForPrint.length > 0) {
    $scope.checkObjects = localDataStorageFactory.selectedLineItemsForPrint;

    $scope.checkData = {
      bankAddress: `${$scope.selectedAccount[0].bankName}\n` +
                   `${$scope.selectedAccount[0].bankStreet}\n` +
                   `${$scope.selectedAccount[0].bankCity}, ${$scope.selectedAccount[0].bankState} ${$scope.selectedAccount[0].bankZip}`,
      micrCode: `O00${$scope.checkObjects[0].checkNum}O T${$scope.selectedAccount[0].routingNumber}T ${$scope.selectedAccount[0].accountNumber}O`,
      checkDate: $scope.checkObjects[0].checkDate,
      memo: $scope.checkObjects[0].memo,
      checkNumber: $scope.checkObjects[0].checkNum,
      checkAmount: parseFloat($scope.checkObjects[0].checkAmount.replace(/[^\d.]/g, '')).toFixed(2),
      checkPayee: $scope.checkObjects[0].transaction,
      userAddress: `${$scope.selectedAccount[0].userName}\n` +
                   `${$scope.selectedAccount[0].userStreet}\n` +
                   `${$scope.selectedAccount[0].userCity}, ${$scope.selectedAccount[0].userState} ${$scope.selectedAccount[0].userZip}`,
    }
    
  } else {
    $scope.checkData = {
      bankAddress: null,
      micrCode: null,
      checkDate: null,
      memo: null,
      checkNumber: null,
      checkAmount: null,
      checkPayee: null

    }
  }

  // $scope.$watchCollection(function() {return localDataStorageFactory.selectedLineItemsForPrint}, function(newVal, oldVal) {
  //   console.log("newVal.length: ", newVal.length);
  //   console.log("newVal: ", newVal);
  //   if (newVal.length === 0){
  //     $scope.checkObjects = newVal;
  //     // $scope.accountsArray.splice(0);
  //   } else {
  //     $scope.checkObjects = newVal;
  //     // $scope.accountsArray = localDataStorageFactory.currentAccounts;
  //     // console.log("The current status of atLeastOneAccount: ", $scope.atLeastOneAccount)
  //   }
  // });
});