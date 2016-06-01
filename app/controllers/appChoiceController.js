// This simply assigns a navbar heading to a angular url

app.controller("appChoiceController", function($scope){

  $scope.ledgerClick = () => console.log("You clicked the Ledger");
  $scope.writerClick = () => console.log("You clicked the writer");

});
