"use strict";

app.factory("navBarFactory", function(){

  return {

    currentView: 'appChoice',

    navTitle: [],

    navButtons: [],

    // Updates the current view based on what button/functionality is selected
    setCurrentView: function(sentNewView) {
      this.currentView = sentNewView;
    },

    //  Changes the NavBar Title on page load
    changeNavBarTitle: function(sentTitle) {
      this.navTitle.splice(0);
      this.navTitle.push(`${sentTitle}`);
    },

    // Changes the NavBar buttons according to the current view
    //  You need to push the elements into the array to for ng-repeat to make the upd
    setNavButtons: function(sentNavButtons) {
      this.navButtons.splice(0);
      for (var element in sentNavButtons) {
        this.navButtons.push(sentNavButtons[element]);
      }
    }
  };

});