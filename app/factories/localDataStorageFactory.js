app.factory("localDataStorageFactory", function(){

  return {

    currentAccounts: [],

    addNewAccount: function(sentAccountInfo) {
      for (var element in sentAccountInfo) {
        this.currentAccounts.push(sentAccountInfo[element]);
      };
    }
  }

});