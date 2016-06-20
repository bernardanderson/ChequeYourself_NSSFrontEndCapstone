app.factory("XHRFactory", function($http){

  return {

    // Pulls the Check Data Entry Fields from the json file and returns the completed 
    //  promise data as X.data
    pullXHRData: function(sentLocation) {
      return $http.get(sentLocation)
    }
  }
  
});