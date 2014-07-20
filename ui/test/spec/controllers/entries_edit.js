'use strict';

describe('Controller: EntriesEditCtrl', function () {
    var rootScope, EntriesEditCtrl, scope;
    beforeEach(module('application'));
    beforeEach(inject(function ($controller, $rootScope) {
        rootScope = $rootScope;
        scope = $rootScope.$new();
        EntriesEditCtrl = $controller('EntriesEditCtrl', {
            $scope: scope,
            entry: {
                id: 0
            }
        });
    }));
    it('should exist', function () {
        expect(!!EntriesEditCtrl).toBeTruthy();
    });
    it('should be initialized', function () {
        expect(scope.distanceUnit).toEqual(rootScope.distanceUnits[1]);
        expect(scope.timeUnit).toEqual(rootScope.timeUnits[2]);
        expect(scope.exception).toEqual('');
        expect(scope.status).toBeTruthy();
    });
});
