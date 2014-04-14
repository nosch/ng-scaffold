# ng-scaffold

## What is it?

This is an [AngularJS](http://angularjs.org) application scaffold. It's inspired by [angular-app](https://github.com/angular-app/angular-app). So the JavaScript and other source code is **organized in modules** and not "by layer". It also provides a build, test and basic deployment process based on [Grunt](http://gruntjs.com/), [Bower](http://bower.io/) and [Karma](http://karma-runner.github.io/). You can use this skeleton as a starting point for frontend development with AngularJS.

In addition the ng-scaffold project is the groundwork for [generator-ng-scaffold](https://github.com/nosch/generator-ng-scaffold), a [yeoman](http://yeoman.io) generator for AngularJS.

## Installation

1. Install [node.js and npm](http://nodejs.org/download/ "Download node.js")
2. $ npm install -g grunt-cli
3. $ git clone git@github.com:nosch/ng-scaffold.git "ng-scaffold"
4. $ cd ng-scaffold
5. $ npm install
6. $ bower install

## How to use
### Develop and build process

Start to develop, to test (incl. code coverage) and finally to build an AngularJS application with one of the following grunt tasks.

- $ grunt server (default)
- $ grunt test
- $ grunt coverage
- $ grunt release

### End-To-End testing with protractor

Run e2e test with [protractor](https://github.com/angular/protractor):

1. $ npm install -g protractor
2. $ webdriver-manager update
3. $ protractor test/config/protractor.conf.js

## Stack
### Application

- AngularJS v1.2.16
- UI-Router v0.2.10
- Twitter Bootstrap v3.1.1
- jQuery v2.1.0
- Underscore.js v1.6.0
- Moment.js v2.6.0
- Modernizr v2.7.2

### Build process

- Grunt v0.4.4
- Bower v1.3.2
- Karma v0.12.9
