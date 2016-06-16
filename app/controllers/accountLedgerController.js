app.controller("accountLedgerController", function($scope){

  $scope.pageTitle = "Account Ledger";

  // For the choice of new account or show ledger
  $scope.ledgerChoice = "showLedger";

  $scope.newAccountPage = false;

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
  $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
  'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
  'WY').split(' ').map(function(state) {
    return {abbrev: state};
  });

  // Changes the view on the Account Ledger Page
  $scope.changeView = (sentChoice) => {
    $scope.ledgerChoice = sentChoice;
    $scope.newAccountPage = true;
  }

  $scope.cancelSubmit = () => {
    $scope.newAccountPage = false;
    $scope.ledgerChoice = "showLedger";
  }

  $scope.addNewAccount = (sentNewAccount) => {
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
    console.log($scope.newAccount);
  }

});