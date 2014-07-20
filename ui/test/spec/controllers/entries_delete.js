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
    it('1', function () {
        expect(!!EntriesDeleteCtrl).toBe(true);
    });
});
