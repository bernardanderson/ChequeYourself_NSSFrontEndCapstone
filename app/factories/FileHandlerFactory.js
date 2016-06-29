app.factory("FileHandlerFactory", function(FileSaver){

  return {

    userName: "",

    userPassword: "",

    // Used for saving a file within the app
    fileSaving: function(sentDataOject) {
      var blob = new Blob([sentDataOject], {type: 'text/plain;charset=utf-8'});
      FileSaver(blob, 'hello world.txt');
    }
  }
  
});