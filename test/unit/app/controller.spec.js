/**
 * Unit Testing: Application/Controller
 */

describe('Unit Testing: Application/Controller', function () {
    'use strict';

    var $scope, $controller;

    beforeEach(module('application'));

    beforeEach(inject(function ($injector) {
        $scope = $injector.get('$rootScope');
        $controller = $injector.get('$controller');
    }));

    describe('ApplicationCtrl', function () {
        it('should call crudListMethods', function () {
            var expected = {
                heading: 'Angular Scaffold!'
            };

            var params = {
                $scope: $scope
            };

            $controller('ApplicationCtrl', params);

            expect($scope.heading).toBe(expected.heading);
        });
    });
});
