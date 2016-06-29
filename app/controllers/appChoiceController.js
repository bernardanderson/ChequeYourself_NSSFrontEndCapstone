// The splash page buttons
app.controller("appChoiceController", function($scope, navBarFactory, XHRFactory, localDataStorageFactory, FileSaver){

  navBarFactory.changeNavBarTitle("Choose Your App");

  // // Pulls the account info and sents it to be stored locally
  // XHRFactory.pullXHRData("json/basicData.json")
  // .then( response => {

  //   localDataStorageFactory.addNewAccount(response.data.accounts);
  //   localDataStorageFactory.addLedgerItems(response.data.lineItems);

  // });

  $scope.clickedChoice = function(sentChoice) {
    navBarFactory.setCurrentView(sentChoice);
  }


});
