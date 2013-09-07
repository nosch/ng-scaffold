/**
 * Module "application", definition, configuration and controller.
 */
angular.module('application', ['ngRoute', 'user'])
    .constant('NAV_ITEMS', [
        {title: 'Home', index: 'home', hash: '#home', icon: 'glyphicon-home'},
        {title: 'About', index: 'about', hash: '#about', icon: 'glyphicon-info-sign'},
        {title: 'Contact', index: 'contact', hash: '#contact', icon: 'glyphicon-earphone'},
        {title: 'My account', index: 'user', hash: '#user/dashboard', icon: 'glyphicon-user'}
    ])

    .config(['$routeProvider', function ($routeProvider) {
        'use strict';

        $routeProvider
            .when('/home', {
                index: 'home',
                templateUrl: '/src/tpl/home.tpl.html',
                controller: 'ApplicationCtrl'
            })
            .when('/about', {
                index: 'about',
                templateUrl: '/src/tpl/about.tpl.html'
            })
            .when('/contact', {
                index: 'contact',
                templateUrl: '/src/tpl/contact.tpl.html'
            })
            .otherwise({
                redirectTo: '/home'
            });
    }])

    .controller('ApplicationCtrl', ['$scope', function ($scope) {
        'use strict';

        $scope.heading = 'Angular Scaffold!';
    }])

    .controller('HeaderCtrl', ['$scope', 'NAV_ITEMS', function ($scope, navItems) {
        'use strict';

        $scope.navItems = navItems;

        $scope.$on('$routeChangeSuccess', function (eOpts, currentRoute) {
            if (currentRoute.$$route) {
                $scope.currentRoute = currentRoute.$$route;
            }
        });
    }]);
