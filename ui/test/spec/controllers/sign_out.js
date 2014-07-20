'use strict';

describe('Controller: SignOutCtrl', function () {
    beforeEach(module('application'));
    var rootScope, SignOutCtrl, scope;
    beforeEach(inject(function ($controller, $rootScope) {
        rootScope = $rootScope;
        scope = $rootScope.$new();
        SignOutCtrl = $controller('SignOutCtrl', {
            $scope: scope
        });
    }));
    it('1', function () {
        expect(!!SignOutCtrl).toBe(true);
    });
});
