/**
 * Sample Application - ng-scaffold
 * @module user.config
 */
angular.module('user.config', [
        'user.dashboard',
        'user.account',
        'user.profile',
        'ngRoute'
    ])

    .config(function ($routeProvider) {
        'use strict';

        $routeProvider
            .when('/user/dashboard', {
                index: 'user',
                templateUrl: 'view/dashboard.tpl.html',
                controller: 'UserCtrl'
            })
            .when('/user/account', {
                index: 'user',
                templateUrl: 'view/account.tpl.html',
                controller: 'UserCtrl'
            })
            .when('/user/profile', {
                index: 'user',
                templateUrl: 'view/profile.tpl.html',
                controller: 'UserCtrl'
            });
    });
