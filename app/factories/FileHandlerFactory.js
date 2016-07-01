app.factory("FileHandlerFactory", function(FileSaver, localDataStorageFactory){

  return {

    userName: "",

    userPassword: "",

    loadedData: [],

    // Used for saving a file within the app
    fileSaving: function(sentLoginInfo) {

      let saveObject = {
        // softwareTitle: "## Valid save file for Cheque-Yourself.com ##",
        accounts: {},
        lineItems: {}
      };

      for (var i = 0; i < localDataStorageFactory.currentAccounts.length; i++) {
        saveObject.accounts['account'+i] = localDataStorageFactory.currentAccounts[i];
      }

      for (var i = 0; i < localDataStorageFactory.currentLedgerItems.length; i++) {
        saveObject.lineItems['item'+i] = localDataStorageFactory.currentLedgerItems[i];
      }

      let encryptedSaveFile = "## Valid save file for Cheque-Yourself.com ##" + sjcl.encrypt(sentLoginInfo.userPassword, angular.toJson(saveObject, true));

      var blob = new Blob([encryptedSaveFile], {type: 'text/plain;charset=utf-8'});
      FileSaver(blob, sentLoginInfo.saveFileName);
    },

    // This stores any valid loaded file data in a temporary variable before decryption
    storeLoadedData: function(sentFileInfo){
      this.loadedData.splice(0);
      sentFileInfo = sentFileInfo.substring(45);
      this.loadedData.push(sentFileInfo); 
    },

    // Once a password is added, this decrypts the data and adds it to the local arrays
    decryptAddToArrays: function(sentLoginInfo) {
      let decryptedAccountInfo = angular.fromJson(sjcl.decrypt(sentLoginInfo.userPassword, this.loadedData[0]));
      localDataStorageFactory.addNewAccount(decryptedAccountInfo.accounts);
      localDataStorageFactory.addLedgerItems(decryptedAccountInfo.lineItems);
    }

  }
  
});