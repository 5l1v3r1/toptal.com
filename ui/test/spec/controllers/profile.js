'use strict';

describe('Controller: ProfileCtrl', function () {
    var rootScope, ProfileCtrl, scope;
    beforeEach(module('application'));
    beforeEach(inject(function ($controller, $rootScope) {
        rootScope = $rootScope;
        scope = $rootScope.$new();
        ProfileCtrl = $controller('ProfileCtrl', {
            $scope: scope
        });
    }));
    it('should exist', function () {
        expect(!!ProfileCtrl).toBeTruthy();
    });
    it('should be initialized', function () {
        expect(scope.email).toEqual('');
        expect(scope.password).toEqual('');
        expect(scope.name).toEqual('');
        expect(scope.exception).toEqual('');
        expect(scope.status).toBeTruthy();
    });
});
