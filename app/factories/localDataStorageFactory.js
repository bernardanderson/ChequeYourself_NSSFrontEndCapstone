"use strict";

app.factory("localDataStorageFactory", function(XHRFactory){

  return {

    parsedLoadedData: "",

    currentAccounts: [],

    currentLedgerItems: [],

    selectedAccount: [],

    selectedAccountLedgerItems: [],

    selectedLineItemsForPrint: [],

    isEditClicked: false,

    // Adds the account information, either from the new Account entry for from XHR pull
    //  to the currentAccounts array for access
    addNewAccount: function(sentAccountInfo) {
      for (var singleAccount in sentAccountInfo) {
        this.currentAccounts.push(sentAccountInfo[singleAccount]);
      }
    },

    // Adds all the ledger items, to this local array for manipulation 
    addLedgerItems: function(sentLedgerInfo) {
      for (var singleLedgerItem in sentLedgerInfo) {
        this.currentLedgerItems.push(sentLedgerInfo[singleLedgerItem]);
      }
    },

    // Updates an edited Account
    updateAccount: function(sentAccountInfo) {
      for (var element in this.currentAccounts) {
        if (this.currentAccounts[element].accountID === sentAccountInfo.accountID) {
          this.currentAccounts[element] = sentAccountInfo;
        }
      }
    },

    formatNumbersToCurrencyString: function(sentNumber) {
      let tempNumber = parseFloat(sentNumber.replace(/[^\d.]/g, ''));
      return `$${tempNumber.toFixed(2)}`;
    },

    // From the navBar dropdown, adds the selected account for manipulation
    addSelectedAccount: function(sentSelectedAccount) {
      this.selectedAccount.splice(0);
      this.selectedAccount.push(sentSelectedAccount);
      this.addSelectedAccountLedgerItems(sentSelectedAccount.accountID);
    },

    // Adds a single ledger item to the complete list of ledger items
    addNewAccountLedgerItem: function(sentSingleLedgerItem) {
      this.currentLedgerItems.push(sentSingleLedgerItem);
      console.log(this.currentLedgerItems);
    },

    // After an account is selected, this pulls the ledger items and adds the
    //  correct ones to the selectedAccountLedgerItems array
    addSelectedAccountLedgerItems: function(sentAccountID) {

      this.selectedAccountLedgerItems.splice(0);

        let lineItemObj = this.currentLedgerItems;
        for (var item in lineItemObj) {
          if (lineItemObj[item].accountID === sentAccountID) {
            this.selectedAccountLedgerItems.push(lineItemObj[item]);
          }
        }
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
  };

});