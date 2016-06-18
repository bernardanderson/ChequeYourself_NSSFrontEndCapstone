// This simply assigns a navbar heading to a angular url

app.controller("appChoiceController", function($scope, navBarFactory){

  // navBarFactory.setNavButtons([
  //   {
  //     buttonLabel: "Account Ledger",
  //     viewChange: "accountLedger"
  //   },
  //   {
  //     buttonLabel: "Cheque Writer",
  //     viewChange: "chequeWriter"
  //   }
  // ]);

  $scope.clickedChoice = function(sentChoice) {
    navBarFactory.setCurrentView(sentChoice);
  }

});
