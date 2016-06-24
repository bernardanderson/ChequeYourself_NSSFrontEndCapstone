app.controller("checkBuilderAJs", function($scope, XHRFactory, navBarFactory, localDataStorageFactory){

  navBarFactory.setNavButtons([
    {
      buttonLabel: "Print Checks",
      viewChange: "chequeWriter",
      extraParameters: "PrintChecks"
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
  $scope.numberOfChecks = [0, 1, 2];

  // Pulls the check elements from the local json and populates the check fields
  XHRFactory.pullXHRData("json/elements.json").then(function(response) {
    $scope.checkEntryElementData = response.data.domElements;
  });


/////////
  if (localDataStorageFactory.selectedAccount.length === 1 && localDataStorageFactory.selectedLineItemsForPrint.length > 0) {
    
    let checkObjects = localDataStorageFactory.selectedLineItemsForPrint;

    $scope.checkData = [];

    for (let i = 0; i < checkObjects.length; i++) {
    
      $scope.checkData.push(
        {
          bankAddress: `${$scope.selectedAccount[0].bankName}\n` +
                       `${$scope.selectedAccount[0].bankStreet}\n` +
                       `${$scope.selectedAccount[0].bankCity}, ${$scope.selectedAccount[0].bankState} ${$scope.selectedAccount[0].bankZip}`,
          micrCode: `O00${checkObjects[i].checkNum}O T${$scope.selectedAccount[0].routingNumber}T ${$scope.selectedAccount[0].accountNumber}O`,
          checkDate: checkObjects[i].checkDate,
          memo: checkObjects[i].memo,
          checkNumber: checkObjects[i].checkNum,
          checkAmount: parseFloat(checkObjects[i].checkAmount.replace(/[^\d.]/g, '')).toFixed(2),
          checkPayee: checkObjects[i].transaction,
          userAddress: `${$scope.selectedAccount[0].userName}\n` +
                       `${$scope.selectedAccount[0].userStreet}\n` +
                       `${$scope.selectedAccount[0].userCity}, ${$scope.selectedAccount[0].userState} ${$scope.selectedAccount[0].userZip}`,
        })
    }
    
  } else {
    $scope.checkData = {
      bankAddress: null,
      micrCode: null,
      checkDate: null,
      memo: null,
      checkNumber: null,
      checkAmount: null,
      checkPayee: null,
      userAddress: null
    }
  }

  // Watcher for the click of the "Clear Checks" button
  $scope.$watchCollection(function() {return localDataStorageFactory.selectedLineItemsForPrint}, function(newVal, oldVal) {
    console.log("newVal.length: ", newVal.length);
    console.log("newVal: ", newVal);
    if (newVal.length === 0){
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
  });
});