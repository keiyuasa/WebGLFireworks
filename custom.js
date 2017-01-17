
var app = angular.module('myApp', []);
app.controller('fireworksCtrl', function($scope) {
    $scope.fireworks = {
        All : { model : "All"},
        Palm : { model : "Palm"},
        Peony : { model : "Peony"},
        Chrisanthemum : { model : "Chrysanthemum"},
        Brocade : { model : "Brocade"},
        Plum: {model:"Plum"}
    },
    $scope.selectedFireworks= $scope.fireworks[0];
    $scope.selected = function(n) {
      setGenerators(n);
    },
    $scope.tailLength = 20;
    $scope.tail = function() {
      globalNumPoints = $scope.tailLength;
      return $scope.tailLength;
    },
    $scope.sparkLife = 100;
    $scope.spark = function() {
        return $scope.sparkLife;
    },
    $scope.starGravity = 7;
    $scope.star_gravity = function() {
        return $scope.starGravity*0.000001;
    },
    $scope.shellDensity = 3;
    $scope.shell_density = function() {
      globalRad=$scope.shellDensity;
      return $scope.shellDensity;
    },
    $scope.shellSize = 7;
    $scope.shell_size = function() {
      globalVel=$scope.shellSize*.0001;
        return $scope.shellSize*.0001;
    },
    $scope.randomRatio = 1;
    $scope.random_ratio = function() {
      globalRandomRatio = $scope.randomRatio*0.00002;
      return $scope.randomRatio*0.00002;
    },
    $scope.diffuse = 1;
    $scope.diffuse_ = function() {
      return $scope.diffuse*1;
    };
});
