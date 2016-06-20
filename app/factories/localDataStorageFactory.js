app.factory("localDataStorageFactory", function(){

  return {

    currentAccounts: [],

    selectedAccount: [],

    // Adds the account information, either from the new Account entry for from XHR pull
    //  to the currentAccounts array for access
    addNewAccount: function(sentAccountInfo) {
      for (var singleAccount in sentAccountInfo) {
        this.currentAccounts.push(sentAccountInfo[singleAccount]);
      }
    },

    // From the navBar dropdown, adds the selected account for manipulation
    addSelectedAccount: function(sentSelectedAccount) {
      this.selectedAccount.splice(0);
      this.selectedAccount.push(sentSelectedAccount);
    },

    // This generates a complex unique ID for various purposes
      // http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
    generateUniqueId: function() {
      let tempUUID = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
      });
      return tempUUID;
    }
  }

});