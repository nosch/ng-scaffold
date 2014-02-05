/**
 * Sample Application - ng-scaffold
 * @module user
 */
angular.module('user', [
        'user.config'
    ])

    .controller('UserCtrl', function ($scope, USER_MODULES) {
        'use strict';

        $scope.userModules = USER_MODULES;

        $scope.heading = 'My account!';
    });
