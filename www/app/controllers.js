angular.module('visitorApp.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('app/login/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('VisitorsCtrl', function($scope) {
  $scope.visitors = [
    { title: 'Steve Smith', id: 1 },
    { title: 'Alice Walker', id: 2 },
    { title: 'Chris Johnson', id: 3 },
    { title: 'Heather Winston', id: 4 },
    { title: 'Tobias Smith', id: 5 },
    { title: 'Sarah Marshall', id: 6 }
  ];
})

.controller('VisitorCtrl', function($scope, $stateParams) {
});
