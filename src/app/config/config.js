/**
 * Sample Application - ng-scaffold
 * @module application.config
 */
angular.module('application.config', [
        'user',
        'ngRoute'
    ])

    .constant('NAV_ITEMS', [
        {title: 'Home', index: 'home', hash: '#home', icon: 'glyphicon-home'},
        {title: 'About', index: 'about', hash: '#about', icon: 'glyphicon-info-sign'},
        {title: 'Contact', index: 'contact', hash: '#contact', icon: 'glyphicon-earphone'},
        {title: 'My account', index: 'user', hash: '#user/dashboard', icon: 'glyphicon-user'}
    ])

    .config([
        '$routeProvider',
        function ($routeProvider) {
            'use strict';

            $routeProvider
                .when('/home', {
                    index: 'home',
                    templateUrl: '/script/view/home.tpl.html',
                    controller: 'ApplicationCtrl'
                })
                .when('/about', {
                    index: 'about',
                    templateUrl: '/script/view/about.tpl.html'
                })
                .when('/contact', {
                    index: 'contact',
                    templateUrl: '/script/view/contact.tpl.html'
                })
                .otherwise({
                    redirectTo: '/home'
                });
        }
    ]);
