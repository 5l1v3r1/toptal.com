'use strict';

describe('Controller: SignInCtrl', function () {
    beforeEach(module('application'));
    var rootScope, SignInCtrl, scope;
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
