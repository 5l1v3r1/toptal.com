'use strict';

describe('Controller: EntriesAddCtrl', function () {
    var rootScope, EntriesAddCtrl, scope;
    beforeEach(module('application'));
    beforeEach(inject(function ($controller, $rootScope) {
        rootScope = $rootScope;
        scope = $rootScope.$new();
        EntriesAddCtrl = $controller('EntriesAddCtrl', {
            $scope: scope
        });
    }));
    it('should exist', function () {
        expect(!!EntriesAddCtrl).toBeTruthy();
    });
    it('should be initialized', function () {
        expect(scope.date).toEqual('');
        expect(scope.distanceUnit).toEqual(rootScope.distanceUnits[0]);
        expect(scope.distanceValue).toEqual('');
        expect(scope.timeUnit).toEqual(rootScope.timeUnits[0]);
        expect(scope.timeValue).toEqual('');
        expect(scope.exception).toEqual('');
        expect(scope.status).toBeTruthy();
    });
});
