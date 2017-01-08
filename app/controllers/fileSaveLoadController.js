"use strict";

// This controller handles all aspects of the File Save/Load Screen
app.controller("fileSaveLoadController", function($scope, navBarFactory, localDataStorageFactory, FileSaver, FileHandlerFactory){

  navBarFactory.changeNavBarTitle("Data Access");
  navBarFactory.setNavButtons([]);

  // Holds the info from the login input box
  $scope.login = {
    userPassword: null,
    saveFileName: null
  };

  // Holds the file load/save messages
  $scope.filemsgs = {};

  // Holds to enable the load file button
  $scope.disableLoad = true;


  // Checks to see if the file selected is a valid "Cheque-Yourself.com" save file
  $scope.checkLoadFile = function($fileContent){

    let loadSubString = $fileContent.substr(23, 19);

      if (loadSubString === "Cheque-Yourself.com") {
        $scope.filemsgs.returnedLoadMessage =  "Valid File Selected";
        $scope.disableLoad = false;
        FileHandlerFactory.storeLoadedData($fileContent);
      } else {
        $scope.filemsgs.returnedLoadMessage =  "This is not a valid Cheque-Yourself! save file.";
      }
  };

  // Checks to see if a user has entered in both a user name, password and filename for saving.  If so, then
  //  the factory is called to save the file.
  $scope.saveFile = function(sentLogin) {

    if (sentLogin.userPassword && sentLogin.saveFileName) {
      $scope.filemsgs.returnedSaveMessage = "Valid Info!";
      FileHandlerFactory.fileSaving(sentLogin);
    } else {
      $scope.filemsgs.returnedSaveMessage = "Please enter a valid User Name, Password and File Name";
    }
  };

  $scope.loadFile = function(sentLogin) {
    FileHandlerFactory.decryptAddToArrays(sentLogin);
    navBarFactory.setCurrentView('accountLedger');
  };
});