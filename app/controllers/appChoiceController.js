// This simply assigns a navbar heading to a angular url

app.controller("appChoiceController", function($scope, $location){

  $scope.ledgerClick = () => $location.path("/ledger");
  
  $scope.writerClick = () => $location.path("/writer");

});
