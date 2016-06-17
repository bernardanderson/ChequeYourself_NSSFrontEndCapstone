// This simply assigns a navbar heading to a angular url

app.controller("appChoiceController", function($scope, navBarFactory){

  $scope.clickedChoice = function(sentChoice) {
    navBarFactory.setCurrentView(sentChoice);
  }

});
