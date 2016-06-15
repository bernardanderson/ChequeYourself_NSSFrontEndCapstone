app.factory("XHRFactory", function($http){

  return {

    // Pulls the Check Data Entry Fields from the json file and returns the completed 
    //  promise data as X.data
    pullCheckElements: function() {
      return $http.get(`json/elements.json`)
    }

  }
});