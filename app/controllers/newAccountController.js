app.controller("newAccountController", function($scope, navBarFactory){

    navBarFactory.setNavButtons([
    {
      buttonLabel: "Cancel",
      viewChange: "accountLedger"
    },
    {
      buttonLabel: "Submit Account Info",
      viewChange: "accountLedger"
    }
  ]);


});