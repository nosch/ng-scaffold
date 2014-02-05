/**
 * Sample Application - ng-scaffold
 * @module application
 */
angular.module('application', [
        'application.config'
    ])

    .run(function ($rootScope, $state, $stateParams) {
        'use strict';

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    })

    .controller('NavigationCtrl', function ($scope, NAV_ITEMS) {
        'use strict';

        $scope.navItems = NAV_ITEMS;
    })

    .controller('HomeCtrl', function ($scope) {
        'use strict';

        $scope.heading = 'Angular Scaffold!';
    });
