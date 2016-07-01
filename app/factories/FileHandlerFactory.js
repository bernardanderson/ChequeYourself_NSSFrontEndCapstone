app.factory("FileHandlerFactory", function(FileSaver, localDataStorageFactory){

  return {

    userName: "",

    userPassword: "",

    loadedData: [],

    // Used for saving a file within the app
    fileSaving: function(sentLoginInfo) {

      let saveObject = {
        softwareTitle: "## Valid save file for Cheque-Yourself.com ##",
        accounts: {},
        lineItems: {}
      };

      for (var i = 0; i < localDataStorageFactory.currentAccounts.length; i++) {
        saveObject.accounts['account'+i] = localDataStorageFactory.currentAccounts[i];
      }

      for (var i = 0; i < localDataStorageFactory.currentLedgerItems.length; i++) {
        saveObject.lineItems['item'+i] = localDataStorageFactory.currentLedgerItems[i];
      }

      let saveObjectStringified = angular.toJson(saveObject, true);

      var blob = new Blob([saveObjectStringified], {type: 'text/plain;charset=utf-8'});
      FileSaver(blob, sentLoginInfo.saveFileName);
    },

    // This stores any valid loaded file data in a temporary variable before decryption
    storeLoadedData: function(sentFileInfo){
      this.loadedData.splice(0);
      let objectFileData = angular.fromJson(sentFileInfo);
      this.loadedData.push(objectFileData);
      console.log("Loaded Data: ", this.loadedData[0]);
    },

    decryptAddToArrays: function(sentLoginInfo) {
      localDataStorageFactory.addNewAccount(this.loadedData[0].accounts);
      localDataStorageFactory.addLedgerItems(this.loadedData[0].lineItems);
    }

  }
  
});