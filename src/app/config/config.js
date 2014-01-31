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

    .config(function ($routeProvider) {
        'use strict';

        $routeProvider
            .when('/home', {
                index: 'home',
                templateUrl: 'view/home.tpl.html',
                controller: 'ApplicationCtrl'
            })
            .when('/about', {
                index: 'about',
                templateUrl: 'view/about.tpl.html'
            })
            .when('/contact', {
                index: 'contact',
                templateUrl: 'view/contact.tpl.html'
            })
            .otherwise({
                redirectTo: '/home'
            });
    });
