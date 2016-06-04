Array.prototype.sum = function (prop, surnamesLenght) {
    var total = 0;
    for (var i = 0, _len = this.length; i < _len; i++) {
        if (this[i].length > 0) {
            var rank = this[i][0][prop];
            console.log(rank);
            total += parseInt(rank);
        }else{
             total += (surnamesLenght);
        }
    }
    return total
}

var underscore = angular.module('underscore', []);
underscore.factory('_', ['$window', function ($window) {
    return $window._; // assumes underscore has already been loaded on the page
}]);

var app = angular.module('agropecuario', ['underscore']);

app.controller('MainCtrl', function ($scope, $http, _) {
    var keepgoing = true;
    $scope.surnames = [];
    $http.get('surnames.json')
        .then(function (res) {
            $scope.surnames = res.data;
        });



    $scope.agropecueame = function (_surnames) {
        $scope.results = [];
        var surnames = _surnames.split(',');
        for (var index = 0; index < surnames.length; index++) {
            var res = _.where($scope.surnames, { Surname: surnames[index] });
            if (res) {
                $scope.results.push(res);
            }
        }
        var total1 = $scope.results.sum('Rank',  $scope.surnames.length);
        var total = (total1 / parseInt($scope.results.length * 2));
        $scope.percentage = (100.5 - total);
        $scope.messageResult = "Eres " + $scope.percentage + "% Agropecuario!";
    }

})

