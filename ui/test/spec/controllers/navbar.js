'use strict';

describe('Controller: NavbarCtrl', function () {
    var rootScope, NavbarCtrl, scope;
    beforeEach(module('application'));
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
