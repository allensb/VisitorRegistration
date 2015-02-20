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

.controller('VisitorCtrl', ['$scope', '$stateParams', 'visitorApi',
        function($scope, $stateParams, visitorApi) {
            visitorApi.getVisitor($stateParams.visitorId, function (data) {
                $scope.visitor = data;
            })
        }])

.controller('PictureCtrl', function($scope, $cordovaCamera) {

    document.addEventListener("deviceready", function () {

        var options = {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 100,
            targetHeight: 100,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };

        $cordovaCamera.getPicture(options).then(function(imageData) {
            var image = document.getElementById('myImage');
            image.src = "data:image/jpeg;base64," + imageData;
        }, function(err) {
            // error
        });

    }, false);
});
