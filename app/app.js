"use strict";

var app = angular.module("ChequeYrslf", ["ngMaterial", "FileSaver", "chart.js"])

  .config(function($mdThemingProvider) {
    // Configure a dark theme with primary foreground yellow
    $mdThemingProvider.theme('special-input')
      .primaryPalette('blue');
  });
