"use strict";

app.controller("newAccountController", function($scope, navBarFactory, localDataStorageFactory){

  navBarFactory.setNavButtons([
    {
      buttonLabel: "Cancel Submission",
      viewChange: "accountLedger"
    }
  ]);

  $scope.isEditClick = localDataStorageFactory.isEditClick;

  if (localDataStorageFactory.selectedAccount.length > 0 && localDataStorageFactory.isEditClick === true) {

    $scope.newAccount = localDataStorageFactory.selectedAccount[0];

    navBarFactory.changeNavBarTitle("Editing Account: " + $scope.newAccount.nickName);

  } else {

    navBarFactory.changeNavBarTitle("Add New Account");

    $scope.newAccount = {
      nickName: null,
      bankName: null,
      bankStreet: null,
      bankCity: null,
      bankState: null,
      bankZip: null,
      userName: null,
      userStreet: null,
      userCity: null,
      userState: null,
      userZip: null,
      accountType: null,
      routingNumber: null,
      accountNumber: null,
      comments: null,
      startingAmount: null,
      accountID: null

    };
  }


  // Allows the selection of states from an option box
  $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY').split(' ').map(function(state) {
    return {abbrev: state};
  });

  // For saving a new account during the new account creation
  $scope.saveAccountInfo = (sentNewAccount) => {

    sentNewAccount.startingAmount = parseFloat(sentNewAccount.startingAmount);

    $scope.newAccount = {
      nickName: sentNewAccount.nickName,
      bankName: sentNewAccount.bankName,
      bankStreet: sentNewAccount.bankStreet,
      bankCity: sentNewAccount.bankCity,
      bankState: sentNewAccount.bankState,
      bankZip: sentNewAccount.bankZip,
      userName: sentNewAccount.userName,
      userStreet: sentNewAccount.userStreet,
      userCity: sentNewAccount.userCity,
      userState: sentNewAccount.userState,
      userZip: sentNewAccount.userZip,
      accountType: sentNewAccount.accountType,
      routingNumber: sentNewAccount.routingNumber,
      accountNumber: sentNewAccount.accountNumber,
      comments: sentNewAccount.comments,
      startingAmount: parseFloat(sentNewAccount.startingAmount)
    };

    // Checks to see if the user is editing an account or adding a new account.  If editing, it keeps the accountID
    //  the same so the ledger items aren't lost
    if (localDataStorageFactory.isEditClick === false) {
      $scope.newAccount.accountID = localDataStorageFactory.generateUniqueId();
      localDataStorageFactory.addNewAccount({"newAccount": $scope.newAccount});
    } else {
      $scope.newAccount.accountID = sentNewAccount.accountID;
      localDataStorageFactory.updateAccount($scope.newAccount);
    }

    localDataStorageFactory.isEditClick = false;
    navBarFactory.setCurrentView('accountLedger');
  };

  // Deletes an account by cycling through the ledger items and deleting them based
  //  on accountID and then deletes the actual account based on accountID
  $scope.deleteAccount = (sentNewAccount) => {

    let completeLedgerList = localDataStorageFactory.currentLedgerItems;
    let completeAccountList = localDataStorageFactory.currentAccounts;

    for (var singleItem in completeLedgerList) {
      if (completeLedgerList[singleItem].accountID === sentNewAccount.accountID) {
        completeLedgerList.splice(singleItem,1);
      }
    }

    for (var singleAccount in completeAccountList) {
      if (completeAccountList[singleAccount].accountID === sentNewAccount.accountID) {
        completeAccountList.splice(singleAccount,1);
      }
    }
    
    navBarFactory.setCurrentView('accountLedger');
  };

});