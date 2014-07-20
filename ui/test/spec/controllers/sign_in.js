'use strict';

describe('Controller: SignInCtrl', function () {
    var rootScope, SignInCtrl, scope;
    beforeEach(module('application'));
    beforeEach(inject(function ($controller, $rootScope) {
        rootScope = $rootScope;
        scope = $rootScope.$new();
        SignInCtrl = $controller('SignInCtrl', {
            $scope: scope
        });
    }));
    it('1', function () {
        expect(!!SignInCtrl).toBe(true);
    });
});
