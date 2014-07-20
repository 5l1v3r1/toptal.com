'use strict';

describe('Controller: SignUpCtrl', function () {
    var rootScope, SignUpCtrl, scope;
    beforeEach(module('application'));
    beforeEach(inject(function ($controller, $rootScope) {
        rootScope = $rootScope;
        scope = $rootScope.$new();
        SignUpCtrl = $controller('SignUpCtrl', {
            $scope: scope
        });
    }));
    it('should exist', function () {
        expect(!!SignUpCtrl).toBeTruthy();
    });
    it('should be initialized', function () {
        expect(scope.email).toEqual('');
        expect(scope.password).toEqual('');
        expect(scope.name).toEqual('');
        expect(scope.exception).toEqual('');
        expect(scope.status).toBeTruthy();
    });
});
