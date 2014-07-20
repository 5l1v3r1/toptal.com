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
    it('1', function () {
        expect(!!EntriesAddCtrl).toBe(true);
    });
});
