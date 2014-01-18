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
                templateUrl: '/script/view/dashboard.tpl.html',
                controller: 'UserCtrl'
            })
            .when('/user/account', {
                index: 'user',
                templateUrl: '/script/view/account.tpl.html',
                controller: 'UserCtrl'
            })
            .when('/user/profile', {
                index: 'user',
                templateUrl: '/script/view/profile.tpl.html',
                controller: 'UserCtrl'
            });
    });
