"use strict";

// The splash page buttons
app.controller("appChoiceController", function($scope, navBarFactory, XHRFactory, localDataStorageFactory, FileSaver){

  navBarFactory.changeNavBarTitle("Choose Your App");

  $scope.clickedChoice = function(sentChoice) {
    navBarFactory.setCurrentView(sentChoice);
  };


});
