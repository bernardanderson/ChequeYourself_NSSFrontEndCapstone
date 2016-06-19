app.factory("localDataStorageFactory", function(){

  return {

    currentAccounts: [],

    addNewAccount: function(sentAccountInfo) {
      this.currentAccounts.push(sentAccountInfo);
    }
  }

});