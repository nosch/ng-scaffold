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
                templateUrl: 'app/module/user/view/dashboard.tpl.html',
                controller: 'UserCtrl'
            })
            .when('/user/account', {
                index: 'user',
                templateUrl: 'app/module/user/view/account.tpl.html',
                controller: 'UserCtrl'
            })
            .when('/user/profile', {
                index: 'user',
                templateUrl: 'app/module/user/view/profile.tpl.html',
                controller: 'UserCtrl'
            });
    });
