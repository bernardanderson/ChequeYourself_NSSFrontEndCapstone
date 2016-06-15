// List of directives for the creation of custom check fields, directives inherit the scope 
//  from the parent controller they're housed in.

app.directive("bankAddress", function(){

  return {
      restrict: 'E',
      replace: true,
      templateUrl: 'templates/bankAddress.html'
  };

});

