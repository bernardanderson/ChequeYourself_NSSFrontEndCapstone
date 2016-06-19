app.controller("newAccountController", function($scope, navBarFactory, localDataStorageFactory){

  navBarFactory.setNavButtons([
    {
      buttonLabel: "Cancel New Account",
      viewChange: "accountLedger"
    }
  ]);

  $scope.newAccount = {
    nickName: null,
    bankName: null,
    bankStreet: null,
    bankState: null,
    bankZip: null,
    accountType: null,
    routingNumber: null,
    accountNumber: null,
    comments: null
  }

  // Allows the selection of states from an option box
  $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY').split(' ').map(function(state) {
    return {abbrev: state};
  });

  // Cancels the submission of a new account
  $scope.cancelSubmit = () => {
    $scope.newAccountPage = false;
    $scope.ledgerChoice = "showLedger";
  }

  // For saving a new account during the new account creation
  $scope.saveAccountInfo = (sentNewAccount) => {
    $scope.newAccount = {
      nickName: sentNewAccount.nickName,
      bankName: sentNewAccount.bankName,
      bankStreet: sentNewAccount.bankStreet,
      bankState: sentNewAccount.bankState,
      bankZip: sentNewAccount.bankZip,
      accountType: sentNewAccount.accountType,
      routingNumber: sentNewAccount.routingNumber,
      accountNumber: sentNewAccount.accountNumber,
      comments: sentNewAccount.comments
    }

    localDataStorageFactory.addNewAccount($scope.newAccount);
    console.log("Result of newAccount in localDataStorage: ", localDataStorageFactory.currentAccounts);
    navBarFactory.setCurrentView('accountLedger');
  }

});