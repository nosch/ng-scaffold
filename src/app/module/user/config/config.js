/**
 * Sample Application - ng-scaffold
 * @module user.config
 */
angular.module('user.config', [
        'user.dashboard',
        'user.account',
        'user.profile',
        'ui.router'
    ])

    .constant('USER_MODULES', [
        {title: 'Dashboard', state: 'user.dashboard', icon: ''},
        {title: 'Account', state: 'user.account', icon: ''},
        {title: 'Profile', state: 'user.profile', icon: ''}
    ])

    .config(function ($stateProvider, $urlRouterProvider) {
        'use strict';

        $urlRouterProvider.otherwise('/user');

        $stateProvider
            .state('user', {
                url: '/user',
                templateUrl: 'app/module/user/view/user.tpl.html',
                controller: 'UserCtrl',
                abstract: true
            })
            .state('user.dashboard', {
                url: '/dashboard',
                templateUrl: 'app/module/user/view/user-dashboard.tpl.html',
                controller: 'UserCtrl'
            })
            .state('user.account', {
                url: '/account',
                templateUrl: 'app/module/user/view/user-account.tpl.html',
                controller: 'UserCtrl'
            })
            .state('user.profile', {
                url: '/profile',
                templateUrl: 'app/module/user/view/user-profile.tpl.html',
                controller: 'UserCtrl'
            });
    });
