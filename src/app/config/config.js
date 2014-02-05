/**
 * Sample Application - ng-scaffold
 * @module application.config
 */
angular.module('application.config', [
        'user',
        'ui.router',
        'template.app'
    ])

    // @todo solve problem with user.dashboard state
    // @todo implement service for injecting $state

    .constant('NAV_ITEMS', [
        {title: 'Home', state: 'home', icon: 'glyphicon-home'},
        {title: 'About', state: 'about', icon: 'glyphicon-info-sign'},
        {title: 'Contact', state: 'contact', icon: 'glyphicon-earphone'},
        {title: 'My account', state: 'user.dashboard', icon: 'glyphicon-user'}
    ])

    .config(function ($stateProvider, $urlRouterProvider) {
        'use strict';

        $urlRouterProvider.otherwise('/home');

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'app/view/home.tpl.html',
                controller: 'HomeCtrl'
            })
            .state('about', {
                url: '/about',
                templateUrl: 'app/view/about.tpl.html'
            })
            .state('contact', {
                url: '/contact',
                templateUrl: 'app/view/contact.tpl.html'
            });
    });
