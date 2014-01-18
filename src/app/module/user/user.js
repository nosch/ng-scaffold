/**
 * Sample Application - ng-scaffold
 * @module user
 */
angular.module('user', [
        'user.config'
    ])

    .controller('UserCtrl', function ($scope) {
        'use strict';

        $scope.mainHeading = 'My account!';
    });
