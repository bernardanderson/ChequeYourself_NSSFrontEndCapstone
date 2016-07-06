"use strict";

// List of directives for the creation of custom check fields, directives inherit the scope 
//  from the parent controller they're housed in.

app.directive("bankAddress", function(){
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'templates/bankAddress.html'
  };
});

app.directive("checkNumber", function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'templates/checkNumber.html'
  };
});

app.directive("fracRouting", function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'templates/fracRouting.html'
  };
});

app.directive("mircCode", function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'templates/mircCode.html'
  };
});

app.directive("payor", function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'templates/payor.html'
  };
});

app.directive("checkDate", function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'templates/checkDate.html'
  };
});

app.directive("checkMemo", function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'templates/checkMemo.html'
  };
});

app.directive("payee", function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'templates/payee.html'
  };
});

app.directive("writtenPayment", function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'templates/writtenPayment.html'
  };
});

app.directive("checkSignature", function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'templates/checkSignature.html'
  };
});
