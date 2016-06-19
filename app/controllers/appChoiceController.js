// The splash page buttons
app.controller("appChoiceController", function($scope, navBarFactory){

  $scope.clickedChoice = function(sentChoice) {
    navBarFactory.setCurrentView(sentChoice);
  }

});
