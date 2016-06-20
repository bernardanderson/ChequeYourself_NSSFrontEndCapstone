// The splash page buttons
app.controller("appChoiceController", function($scope, navBarFactory, XHRFactory, localDataStorageFactory){

  XHRFactory.pullUserAccounts().then( response => localDataStorageFactory.addNewAccount(response.data.accounts));

  $scope.clickedChoice = function(sentChoice) {
    navBarFactory.setCurrentView(sentChoice);
  }

});
