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
    it('should exist', function () {
        expect(!!SignInCtrl).toBeTruthy();
    });
    it('should be initialized', function () {
        expect(scope.email).toEqual('');
        expect(scope.password).toEqual('');
        expect(scope.exception).toEqual('');
        expect(scope.status).toBeTruthy();
    });
});
