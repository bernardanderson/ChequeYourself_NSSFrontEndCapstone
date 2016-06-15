// This simply assigns a navbar heading to a angular url

app.controller("navBarController", function($scope){

  var navBar = this;
  $scope.navItems = "Basic Navbar";
  navBar.clicked = true;

  $scope.clickChange = function() {
    if (navBar.clicked === true) {
      navBar.clicked = false;
    } else {
      navBar.clicked = true;
    }
  }

});
