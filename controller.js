//var app = angular.module('myApp', []);
/*app.controller('personCtrl', function($scope) {
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
    //alert("alert "+n);
    setGenerators(n);
  };

  $scope.tailLength = 20;
  $scope.tail = function() {
    return $scope.tailLength;
  };

    $scope.sparkLife = 100;
    $scope.spark = function() {
        return $scope.sparkLife;
    };
    $scope.starGravity = 7;
    $scope.star_gravity = function() {
        return $scope.starGravity*0.000001;
    };
    $scope.starSize = 7;
    $scope.star_size = function() {
        return $scope.starSize;
    };
    $scope.randomRatio = 1;
    $scope.random_ratio = function() {
        return $scope.randomRatio*0.001;
    };
    $scope.diffuse = 1;
    $scope.diffuse_ = function() {
        return $scope.diffuse*1;
    };

    $scope.firstName = "John";
    $scope.lastName = "Doe";
    $scope.fullName = function() {
      return $scope.lastName+", "+$scope.firstName;

    }
    $scope.fval = {
      value: 4,
      options: {
        floor: 2,
        ceil: 6,
        step: 1
      }
    },
    $scope.dval = {
      value: 4,
      options: {
        floor: 2,
        ceil: 6,
        step: 1
      }
    },
    $scope.dval2 = {
      value: 4,
      options: {
        floor: 2,
        ceil: 6,
        step: 1
      }
    },

    $scope.den = 3
    $scope.den2 = function() {
      return $scope.density;
    }
    $scope.value2=function() {
      //alert($scope.density.value);
      return $scope.density.value;
    },
    $scope.star_density = 3;
    $scope.density2 = function() {
      alert("star density 2 "+$scope.density.value);
      return $scope.density.value;
    }
});
*/

var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
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
      alert("alert "+n);
      setGenerators(n);
    };

    $scope.tailLength = 20;
    $scope.tail = function() {
      alert("tailLength");
      return $scope.tailLength;
    };

});
