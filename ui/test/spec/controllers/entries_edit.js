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
    it('1', function () {
        expect(!!EntriesEditCtrl).toBe(true);
    });
});
