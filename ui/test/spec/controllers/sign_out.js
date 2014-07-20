'use strict';

describe('Controller: SignOutCtrl', function () {
    var rootScope, SignOutCtrl, scope;
    beforeEach(module('application'));
    beforeEach(inject(function ($controller, $rootScope) {
        rootScope = $rootScope;
        scope = $rootScope.$new();
        SignOutCtrl = $controller('SignOutCtrl', {
            $scope: scope
        });
    }));
    it('should exist', function () {
        expect(!!SignOutCtrl).toBeTruthy();
    });
});
