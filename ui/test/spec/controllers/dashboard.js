'use strict';

describe('Controller: DashboardCtrl', function () {
    var rootScope, DashboardCtrl, scope;
    beforeEach(module('application'));
    beforeEach(inject(function ($controller, $rootScope) {
        rootScope = $rootScope;
        scope = $rootScope.$new();
        DashboardCtrl = $controller('DashboardCtrl', {
            $scope: scope
        });
    }));
    it('should exist', function () {
        expect(!!DashboardCtrl).toBeTruthy();
    });
    it('should be initialized', function () {
        expect(scope.spinner).toBeTruthy();
        expect(scope.data).toEqual({});
    });
});
