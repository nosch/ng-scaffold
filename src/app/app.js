/**
 * Sample Application - ng-scaffold
 * @module application
 */
angular.module('application', [
        'application.config'
    ])

    .controller('ApplicationCtrl', function ($scope) {
        'use strict';

        $scope.heading = 'Angular Scaffold!';
    })

    .controller('HeaderCtrl', function ($scope, NAV_ITEMS) {
        'use strict';

        $scope.navItems = NAV_ITEMS;

        $scope.$on('$routeChangeSuccess', function (eOpts, currentRoute) {
            if (currentRoute.$$route) {
                $scope.currentRoute = currentRoute.$$route;
            }
        });
    });
