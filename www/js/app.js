// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var myApp = angular.module("starter", ["ionic"]);

myApp.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
});

myApp.controller("loginCtrl", function ($scope, $log, $rootScope) {
    // Get a reference to the Firebase
    var firebaseRef = new Firebase("https://tsubik-ionic-auth.firebaseio.com/");

    // Initially set no user to be logged in
    $scope.user = undefined;

    firebaseRef.onAuth(function (authData) {
        if (authData) {
            $log.log('auth user');
            $scope.$apply(function () {
                $scope.user = authData.facebook;
            });
        } else {
            $log.log('unauth user');
            $scope.user = undefined;
        }
    });
    // Logs a user in with inputted provider
    $scope.login = function (provider) {
        firebaseRef.authWithOAuthPopup(provider, function (error, authData) {
            if (error) {
                $log.log("Error logging user in: ", error);
            }
        });
    };

    // Logs a user out
    $scope.logout = function () {
        firebaseRef.unauth();
    };
});
