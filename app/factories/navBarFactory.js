app.factory("navBarFactory", function(){

  return {

    currentView: 'appChoice',

    setCurrentView: function(sentNewView) {
      this.currentView = sentNewView;
    }
  }

});