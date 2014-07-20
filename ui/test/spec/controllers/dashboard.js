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
    it('1', function () {
        expect(!!DashboardCtrl).toBe(true);
    });
});
