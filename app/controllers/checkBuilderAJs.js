app.controller("checkBuilderAJs", function($scope, XHRFactory){

  // Object that holds all the element data from the templates.
  $scope.checkEntryElementData = {};

  $scope.hideElement = false;

  $scope.changeHide = function(sentChange) {
    $scope.hideElement = !$scope.hideElement;
  }

  XHRFactory.pullCheckElements().then(function(response) {
    $scope.checkEntryElementData = response.data.domElements;
    console.log($scope.checkEntryElementData)
  });




});