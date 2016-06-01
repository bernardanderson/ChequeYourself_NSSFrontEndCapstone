// This simply assigns a navbar heading to a angular url

app.controller("appChoiceController", function($scope){

  $scope.ledgerTitle = "Account Ledger";

  $scope.ledgerClick = () => console.log("You clicked the Ledger");

});
