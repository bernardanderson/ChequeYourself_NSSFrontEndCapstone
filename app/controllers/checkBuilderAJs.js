app.controller("checkBuilderAJs", function($scope, XHRFactory, navBarFactory, localDataStorageFactory){

  navBarFactory.setNavButtons([
    {
      buttonLabel: "Print Checks",
      viewChange: "chequeWriter"
    },
    {
      buttonLabel: "Clear Checks",
      viewChange: "chequeWriter"
    }
  ]);

  // Object that holds all the element data from the templates.
  $scope.checkEntryElementData = {};

  $scope.hideElement = false;

  $scope.changeHide = function(sentChange) {
    $scope.hideElement = !$scope.hideElement;
  }

  // Pulls the check elements from the local json and populates the check fields
  XHRFactory.pullXHRData("json/elements.json").then(function(response) {
    $scope.checkEntryElementData = response.data.domElements;
    console.log($scope.checkEntryElementData)
  });

});