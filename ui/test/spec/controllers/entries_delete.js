'use strict';

describe('Controller: EntriesDeleteCtrl', function () {
    var rootScope, EntriesDeleteCtrl, scope;
    beforeEach(module('application'));
    beforeEach(inject(function ($controller, $rootScope) {
        rootScope = $rootScope;
        scope = $rootScope.$new();
        EntriesDeleteCtrl = $controller('EntriesDeleteCtrl', {
            $scope: scope,
            entry: {
                id: 0
            }
        });
    }));
    it('should exist', function () {
        expect(!!EntriesDeleteCtrl).toBeTruthy();
    });
    it('should be initialized', function () {
        expect(scope.exception).toEqual('');
        expect(scope.status).toBeTruthy();
    });
});
