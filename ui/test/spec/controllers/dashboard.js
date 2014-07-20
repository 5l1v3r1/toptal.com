'use strict';

describe('Controller: DashboardCtrl', function () {
    beforeEach(module('application'));
    var rootScope, DashboardCtrl, scope;
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
