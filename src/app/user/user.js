/**
 * Module "user", definition, configuration and controller.
 */
angular.module('user', ['ngRoute', 'user-dashboard', 'user-account', 'user-profile'])
    .config(['$routeProvider', function ($routeProvider) {
        'use strict';

        $routeProvider
            .when('/user/dashboard', {
                index: 'user',
                templateUrl: '/src/tpl/dashboard.tpl.html',
                controller: 'UserCtrl'
            })
            .when('/user/account', {
                index: 'user',
                templateUrl: '/src/tpl/account.tpl.html',
                controller: 'UserCtrl'
            })
            .when('/user/profile', {
                index: 'user',
                templateUrl: '/src/tpl/profile.tpl.html',
                controller: 'UserCtrl'
            });
    }])

    .controller('UserCtrl', ['$scope', function ($scope) {
        'use strict';

        $scope.mainHeading = 'My account!';
    }]);
