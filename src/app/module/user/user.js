/**
 * Sample Application - ng-scaffold
 * @module user
 */
angular.module('user', [
        'user.config'
    ])

    .controller('UserCtrl', [
        '$scope',
        function ($scope) {
            'use strict';

            $scope.mainHeading = 'My account!';
        }
    ]);
