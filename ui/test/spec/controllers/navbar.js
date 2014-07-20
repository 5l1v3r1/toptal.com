'use strict';

describe('Controller: NavbarCtrl', function () {
    beforeEach(module('application'));
    var rootScope, NavbarCtrl, scope;
    beforeEach(inject(function ($controller, $rootScope) {
        rootScope = $rootScope;
        scope = $rootScope.$new();
        NavbarCtrl = $controller('NavbarCtrl', {
            $scope: scope
        });
    }));
    it('1', function () {
        if (rootScope.user !== null) {
            expect(scope.items.length).toBe(4);
        }
        if (rootScope.user === null) {
            expect(scope.items.length).toBe(2);
        }
    });
});