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

.controller('VisitorsCtrl', ['$scope', 'visitorApi',
        function($scope, visitorApi) {
            visitorApi.getVisitors(function(data) {
                $scope.visitors = data;
            })
        }])

.controller('VisitorCtrl', ['$scope', '$stateParams', '$cordovaCamera', 'visitorApi',
        function($scope, $stateParams, $cordovaCamera, visitorApi) {
            visitorApi.getVisitor($stateParams.visitorId, function (data) {
                $scope.visitor = data;

                $scope.takePicture = function(){
                    var cameraOptions = {
                        quality: 50,
                        destinationType: Camera.DestinationType.DATA_URL
                    };
                    var success = function(data){
                        $scope.$apply(function () {
                            /*
                             remember to set the image ng-src in $apply,
                             i tried to set it from outside and it doesn't work.
                             */
                            $scope.cameraPic = "data:image/jpeg;base64," + data;
                        });
                    };
                    var failure = function(message){
                        alert('Failed because: ' + message);
                    };
                    //call the cordova camera plugin to open the device's camera
                    navigator.camera.getPicture( success , failure , cameraOptions );
                };
            })
        }])
