// This simply assigns a navbar heading to a angular url

app.controller("navBarController", function($scope){

  var navBar = this;
  $scope.navItems = "Basic Navbar";
  navBar.clicked = 'appChoice';

  $scope.clickChange = function(sentPage) {
    navBar.clicked = sentPage;
  }

});
