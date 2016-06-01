"use strict";

var app = angular.module("ChequeYrslf", ["ngRoute", "ngMaterial"]);

// This setup allows the usage of partials for the various parts of the app.
//  Note: $routeProvider is a method in ngRoute
app.config(function($routeProvider) {
  $routeProvider.
    when("/", {
      templateUrl: "./partials/appChoice.html",
      controller: "appChoiceController"
    }).
    when("/ledger", {
      templateUrl: "./partials/accountLedger.html",
      controller: "accountLedgerController"
    }).
    when("/writer", {
      templateUrl: "./partials/chequeWriter.html",
      controller: "chequeWriterController"
    }).
    otherwise("/");
});