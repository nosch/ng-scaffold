/**
 * Sample Application - ng-scaffold
 * @module application
 */
angular.module('application', [
        'application.config'
    ])

    .controller('ApplicationCtrl', [
        '$scope',
        function ($scope) {
            'use strict';

            $scope.heading = 'Angular Scaffold!';
        }
    ])

    .controller('HeaderCtrl', [
        '$scope',
        'NAV_ITEMS',
        function ($scope, navItems) {
            'use strict';

            $scope.navItems = navItems;

            $scope.$on('$routeChangeSuccess', function (eOpts, currentRoute) {
                if (currentRoute.$$route) {
                    $scope.currentRoute = currentRoute.$$route;
                }
            });
        }
    ]);
