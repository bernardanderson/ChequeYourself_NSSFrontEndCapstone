// The splash page buttons
app.controller("fileSaveLoadController", function($scope, navBarFactory, XHRFactory, localDataStorageFactory, FileSaver, FileHandlerFactory){

  // Holds the info from the login input box
  $scope.login = {};

  $scope.showContent = function($fileContent){

    localDataStorageFactory.testForValidFile
    try {
        angular.fromJson($fileContent);
    } catch (e) {
        console.log("Not a valid Json File");
    }
        console.log("Is a valid Json File");

    // localDataStorageFactory.loadedData = angular.fromJson($fileContent);
    // console.log(localDataStorageFactory.loadedData);
    // console.log(localDataStorageFactory.loadedData);
  };

});